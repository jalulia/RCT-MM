-- Run once in the selected Supabase project's SQL editor.
-- No service-role key is used by the browser. Rooms are shared with an edit link.
begin;
create schema if not exists extensions;
create extension if not exists pg_jsonschema with schema extensions;
create schema if not exists mmt_private;
revoke all on schema mmt_private from public, anon, authenticated;

create or replace function mmt_private.board_schema() returns json
language sql immutable set search_path = '' as $function$
  select $board_schema${"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://jalulia.github.io/RCT-MM/Design/whiteboard/board.schema.json","title":"Mad Money Tycoon design board","description":"An editable scenario and diagram. Source references remain references; simulation results are derived from scenario settings and replayed actions.","type":"object","additionalProperties":false,"required":["schemaVersion","id","title","nodes","edges","ink","scenario","runtime","viewport"],"properties":{"schemaVersion":{"const":1},"id":{"$ref":"#/$defs/id"},"title":{"type":"string","minLength":1,"maxLength":160},"nodes":{"type":"array","maxItems":300,"items":{"$ref":"#/$defs/node"}},"edges":{"type":"array","maxItems":800,"items":{"$ref":"#/$defs/edge"}},"ink":{"type":"array","maxItems":300,"items":{"$ref":"#/$defs/stroke"}},"scenario":{"$ref":"#/$defs/scenario"},"runtime":{"type":"object","additionalProperties":false,"required":["actions"],"properties":{"actions":{"type":"array","maxItems":500,"items":{"$ref":"#/$defs/action"}}}},"viewport":{"type":"object","additionalProperties":false,"required":["x","y","zoom"],"properties":{"x":{"type":"number","minimum":-1000000,"maximum":1000000},"y":{"type":"number","minimum":-1000000,"maximum":1000000},"zoom":{"type":"number","minimum":0.1,"maximum":8}}}},"$defs":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_.:-]{0,95}$"},"coordinate":{"type":"number","minimum":-100000,"maximum":100000},"node":{"type":"object","additionalProperties":false,"required":["id","type","title","x","y","params"],"properties":{"id":{"$ref":"#/$defs/id"},"type":{"enum":["project","staff","supplier","site","zone","obligation","payment","record","approval","artifact","archetype","trigger","effect","note","beat","anchor"]},"title":{"type":"string","minLength":1,"maxLength":240},"x":{"$ref":"#/$defs/coordinate"},"y":{"$ref":"#/$defs/coordinate"},"params":{"type":"object","maxProperties":80,"propertyNames":{"not":{"enum":["__proto__","prototype","constructor"]}}},"ref":{"type":"string","minLength":1,"maxLength":500}}},"edge":{"type":"object","additionalProperties":false,"required":["id","from","to","kind"],"properties":{"id":{"$ref":"#/$defs/id"},"from":{"$ref":"#/$defs/id"},"to":{"$ref":"#/$defs/id"},"kind":{"enum":["flow","requires","informs"]},"label":{"type":"string","maxLength":240}}},"point":{"type":"object","additionalProperties":false,"required":["x","y"],"properties":{"x":{"$ref":"#/$defs/coordinate"},"y":{"$ref":"#/$defs/coordinate"}}},"stroke":{"type":"object","additionalProperties":false,"required":["id","color","width","points"],"properties":{"id":{"$ref":"#/$defs/id"},"color":{"type":"string","pattern":"^#[0-9a-fA-F]{6}$"},"width":{"type":"number","minimum":0.5,"maximum":24},"points":{"type":"array","minItems":1,"maxItems":5000,"items":{"$ref":"#/$defs/point"}}}},"dollars":{"type":"number","minimum":0,"maximum":10000000,"multipleOf":0.01},"scenario":{"type":"object","additionalProperties":false,"required":["plan","placement","mode","crew"],"properties":{"plan":{"enum":["supplier","internal"]},"placement":{"enum":["near","shared"]},"mode":{"enum":["full","ordinary"]},"crew":{"enum":[1,2]},"assumptions":{"type":"object","additionalProperties":false,"description":"Editable simulation amounts, in USD. These do not change source records.","properties":{"startingCash":{"$ref":"#/$defs/dollars"},"supplierCost":{"$ref":"#/$defs/dollars"},"materialsCost":{"$ref":"#/$defs/dollars"},"payroll":{"$ref":"#/$defs/dollars"}}}}},"action":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"enum":["advance","request","reissue","substitute","crew","fire","poolAnswer"]},"value":{"type":["string","number"]},"nodeId":{"$ref":"#/$defs/id"}},"allOf":[{"if":{"properties":{"type":{"const":"request"}}},"then":{"required":["value"],"properties":{"value":{"enum":["processor","recipient","invoice","approval","delay"]}}}},{"if":{"properties":{"type":{"const":"crew"}}},"then":{"required":["value"],"properties":{"value":{"enum":[1,2]}}}},{"if":{"properties":{"type":{"const":"fire"}}},"then":{"required":["nodeId"]}},{"if":{"properties":{"type":{"const":"poolAnswer"}}},"then":{"required":["value"],"properties":{"value":{"type":"integer","minimum":0,"maximum":1000000000}}}}]}}}$board_schema$::json;
$function$;

create or replace function mmt_private.safe_json(value jsonb, depth integer default 0) returns boolean
language plpgsql immutable set search_path = '' as $function$
declare entry record;
begin
  if depth > 12 then return false; end if;
  if jsonb_typeof(value) = 'string' then return length(value #>> '{}') <= 16000; end if;
  if jsonb_typeof(value) = 'object' then
    if (select count(*) from jsonb_object_keys(value)) > 80 then return false; end if;
    for entry in select * from jsonb_each(value) loop
      if entry.key in ('__proto__', 'prototype', 'constructor') or not mmt_private.safe_json(entry.value, depth + 1) then return false; end if;
    end loop;
  elsif jsonb_typeof(value) = 'array' then
    for entry in select item from jsonb_array_elements(value) as a(item) loop
      if not mmt_private.safe_json(entry.item, depth + 1) then return false; end if;
    end loop;
  end if;
  return true;
end;
$function$;

create or replace function mmt_private.valid_board(board jsonb) returns boolean
language plpgsql immutable set search_path = '' as $function$
begin
  if board is null or octet_length(board::text) > 2097152 then return false; end if;
  if not extensions.jsonb_matches_schema(mmt_private.board_schema(), board) then return false; end if;
  if not mmt_private.safe_json(board) then return false; end if;
  if exists (
    select item->>'id' from (
      select item from jsonb_array_elements(board->'nodes') as n(item)
      union all select item from jsonb_array_elements(board->'edges') as e(item)
      union all select item from jsonb_array_elements(board->'ink') as i(item)
    ) all_items group by item->>'id' having count(*) > 1
  ) then return false; end if;
  if exists (
    select 1 from jsonb_array_elements(board->'edges') edge
    where not exists (select 1 from jsonb_array_elements(board->'nodes') node where node->>'id' = edge->>'from')
       or not exists (select 1 from jsonb_array_elements(board->'nodes') node where node->>'id' = edge->>'to')
  ) then return false; end if;
  if (select coalesce(sum(jsonb_array_length(stroke->'points')),0) from jsonb_array_elements(board->'ink') stroke) > 50000 then return false; end if;
  return true;
end;
$function$;

create table if not exists mmt_private.rooms (
  id uuid primary key default gen_random_uuid(),
  edit_key_hash bytea not null,
  board jsonb not null check (mmt_private.valid_board(board)),
  revision bigint not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists mmt_private.presence (
  room_id uuid not null references mmt_private.rooms(id) on delete cascade,
  client_id text not null,
  value jsonb not null,
  seen_at timestamptz not null default now(),
  primary key(room_id, client_id)
);
create table if not exists mmt_private.receipts (
  room_id uuid not null references mmt_private.rooms(id) on delete cascade,
  client_id text not null,
  mutation_id text not null,
  operations_hash bytea not null,
  revision bigint not null,
  created_at timestamptz not null default now(),
  primary key(room_id, client_id, mutation_id)
);
alter table mmt_private.rooms enable row level security;
alter table mmt_private.presence enable row level security;
alter table mmt_private.receipts enable row level security;
revoke all on all tables in schema mmt_private from public, anon, authenticated;
revoke all on all functions in schema mmt_private from public, anon, authenticated;

create or replace function public.mmt_board_create(p_board jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $function$
declare room mmt_private.rooms%rowtype; edit_key text;
begin
  if not mmt_private.valid_board(p_board) then return jsonb_build_object('ok',false,'message','The board format is invalid.'); end if;
  -- A bounded pilot. The project owner can export/archive rooms before raising this limit.
  perform pg_advisory_xact_lock(731901);
  if (select count(*) from mmt_private.rooms) >= 100 then return jsonb_build_object('ok',false,'message','The project has reached its 100-room limit. Contact the project owner.'); end if;
  edit_key := replace(gen_random_uuid()::text,'-','') || replace(gen_random_uuid()::text,'-','');
  insert into mmt_private.rooms(edit_key_hash,board) values(sha256(convert_to(edit_key,'UTF8')),p_board) returning * into room;
  return jsonb_build_object('ok',true,'roomId',room.id,'editKey',edit_key,'board',room.board,'revision',room.revision,'participants','[]'::jsonb);
end;
$function$;

create or replace function public.mmt_board_read(p_room_id uuid, p_edit_key text, p_client_id text, p_since bigint default -1, p_presence jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $function$
declare room mmt_private.rooms%rowtype; people jsonb; clean_presence jsonb;
begin
  if p_edit_key is null or p_edit_key !~ '^[0-9a-f]{64}$' or p_client_id is null or p_client_id !~ '^[A-Za-z0-9_.:-]{1,96}$' then return jsonb_build_object('ok',false,'message','The room link is invalid.'); end if;
  select * into room from mmt_private.rooms where id = p_room_id and edit_key_hash = sha256(convert_to(p_edit_key,'UTF8'));
  if not found then return jsonb_build_object('ok',false,'message','The room link is invalid.'); end if;
  if p_presence is null or jsonb_typeof(p_presence) <> 'object' or octet_length(p_presence::text) > 1024 then return jsonb_build_object('ok',false,'message','Presence data is invalid.'); end if;
  clean_presence := jsonb_build_object('name',left(coalesce(p_presence->>'name','Guest'),48),'view',case when p_presence->>'view' in ('systems','story','structure') then p_presence->>'view' else 'systems' end);
  if jsonb_typeof(p_presence->'x') = 'number' and jsonb_typeof(p_presence->'y') = 'number' and abs((p_presence->>'x')::numeric) <= 100000 and abs((p_presence->>'y')::numeric) <= 100000 then
    clean_presence := clean_presence || jsonb_build_object('x',p_presence->'x','y',p_presence->'y');
  end if;
  delete from mmt_private.presence where room_id = p_room_id and seen_at < now() - interval '45 seconds';
  if not exists(select 1 from mmt_private.presence where room_id = p_room_id and client_id = p_client_id) and (select count(*) from mmt_private.presence where room_id = p_room_id) >= 32 then return jsonb_build_object('ok',false,'message','This room already has 32 active participants.'); end if;
  insert into mmt_private.presence(room_id,client_id,value,seen_at) values(p_room_id,p_client_id,clean_presence,now())
    on conflict(room_id,client_id) do update set value=excluded.value,seen_at=excluded.seen_at;
  select coalesce(jsonb_agg(value || jsonb_build_object('clientId',client_id,'seenAt',seen_at) order by client_id),'[]'::jsonb) into people from mmt_private.presence where room_id = p_room_id and seen_at > now() - interval '45 seconds';
  return jsonb_build_object('ok',true,'revision',room.revision,'participants',people) || case when p_since = room.revision then '{}'::jsonb else jsonb_build_object('board',room.board) end;
end;
$function$;

create or replace function public.mmt_board_patch(p_room_id uuid, p_edit_key text, p_client_id text, p_base_revision bigint, p_mutation_id text, p_ops jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $function$
declare
  room mmt_private.rooms%rowtype; receipt mmt_private.receipts%rowtype;
  next_board jsonb; op jsonb; current_value jsonb; item jsonb; items jsonb;
  collection text; item_id text; field_name text; item_index integer; op_path text[];
  conflicts jsonb := '[]'::jsonb; label text; operations_hash bytea;
begin
  if p_edit_key is null or p_edit_key !~ '^[0-9a-f]{64}$' or p_client_id is null or p_client_id !~ '^[A-Za-z0-9_.:-]{1,96}$' or p_mutation_id is null or p_mutation_id !~ '^[A-Za-z0-9_.:-]{1,96}$' then return jsonb_build_object('ok',false,'message','The room request is invalid.'); end if;
  if p_ops is null or jsonb_typeof(p_ops) <> 'array' or jsonb_array_length(p_ops) > 1200 or octet_length(p_ops::text) > 2097152 then return jsonb_build_object('ok',false,'message','The change set is too large or invalid.'); end if;
  -- Serialize all patches to a room before checking their base values.
  select * into room from mmt_private.rooms where id = p_room_id and edit_key_hash = sha256(convert_to(p_edit_key,'UTF8')) for update;
  if not found then return jsonb_build_object('ok',false,'message','The room link is invalid.'); end if;
  if p_base_revision is null or p_base_revision < 1 or p_base_revision > room.revision then return jsonb_build_object('ok',false,'message','The base revision is invalid.','board',room.board,'revision',room.revision); end if;
  operations_hash := sha256(convert_to(p_ops::text,'UTF8'));
  select * into receipt from mmt_private.receipts where room_id=p_room_id and client_id=p_client_id and mutation_id=p_mutation_id;
  if found then
    if receipt.operations_hash <> operations_hash then return jsonb_build_object('ok',false,'message','A mutation ID was reused with different changes.'); end if;
    return jsonb_build_object('ok',true,'replayed',true,'board',room.board,'revision',room.revision);
  end if;
  next_board := room.board;
  for op in select value from jsonb_array_elements(p_ops) loop
    if jsonb_typeof(op) <> 'object' or not (op ? 'before' and op ? 'after') then return jsonb_build_object('ok',false,'message','An operation is invalid.'); end if;
    if op->>'kind' in ('entity','field') then
      collection := op->>'collection'; item_id := op->>'id'; field_name := op->>'field';
      if collection is null or collection not in ('nodes','edges','ink') or item_id is null or item_id !~ '^[A-Za-z0-9][A-Za-z0-9_.:-]{0,95}$' then return jsonb_build_object('ok',false,'message','An object operation is invalid.'); end if;
      items := next_board->collection; item := null; item_index := null;
      select value,(ordinality-1)::integer into item,item_index from jsonb_array_elements(items) with ordinality where value->>'id'=item_id;
      if op->>'kind'='field' and (field_name is null or not (
        collection='nodes' and field_name in ('type','title','x','y','params','ref') or
        collection='edges' and field_name in ('from','to','kind','label') or
        collection='ink' and field_name in ('color','width','points')
      )) then return jsonb_build_object('ok',false,'message','An object field is invalid.'); end if;
      current_value := case when op->>'kind'='entity' then coalesce(item,'null'::jsonb) else coalesce(item->field_name,'null'::jsonb) end;
      label := collection || '/' || item_id || case when op->>'kind'='field' then '/' || field_name else '' end;
      if current_value = op->'after' then continue; end if;
      if current_value <> op->'before' or op->>'kind'='field' and item is null then conflicts := conflicts || to_jsonb(label); continue; end if;
      if op->>'kind'='entity' then
        if op->'after' <> 'null'::jsonb and (jsonb_typeof(op->'after') <> 'object' or op->'after'->>'id' is distinct from item_id) then return jsonb_build_object('ok',false,'message','An object ID changed.'); end if;
        if op->'after'='null'::jsonb then
          if item_index is not null then items := items - item_index; end if;
        elsif item_index is null then items := items || jsonb_build_array(op->'after');
        else items := jsonb_set(items,array[item_index::text],op->'after',false); end if;
      else
        if op->'after'='null'::jsonb then item := item - field_name; else item := jsonb_set(item,array[field_name],op->'after',true); end if;
        items := jsonb_set(items,array[item_index::text],item,false);
      end if;
      next_board := jsonb_set(next_board,array[collection],items,false);
    elsif op->>'kind'='value' then
      if jsonb_typeof(op->'path') <> 'array' then return jsonb_build_object('ok',false,'message','A value path is invalid.'); end if;
      select array_agg(value order by ordinality) into op_path from jsonb_array_elements_text(op->'path') with ordinality;
      if op_path is null or not (op_path = array['title'] or op_path = array['runtime','actions'] or array_length(op_path,1)=2 and op_path[1]='scenario' and op_path[2] in ('plan','placement','mode','crew','assumptions')) then return jsonb_build_object('ok',false,'message','A value path is invalid.'); end if;
      current_value := coalesce(next_board #> op_path,'null'::jsonb);
      if current_value = op->'after' then continue; end if;
      if current_value <> op->'before' then conflicts := conflicts || to_jsonb(array_to_string(op_path,'/')); continue; end if;
      if op->'after'='null'::jsonb then next_board := next_board #- op_path; else next_board := jsonb_set(next_board,op_path,op->'after',true); end if;
    else return jsonb_build_object('ok',false,'message','An operation type is invalid.'); end if;
  end loop;
  if jsonb_array_length(conflicts)>0 then return jsonb_build_object('ok',false,'conflicts',conflicts,'board',room.board,'revision',room.revision); end if;
  if not mmt_private.valid_board(next_board) then return jsonb_build_object('ok',false,'message','These changes would create an invalid board.','board',room.board,'revision',room.revision); end if;
  if next_board <> room.board then update mmt_private.rooms set board=next_board,revision=revision+1,updated_at=now() where id=p_room_id returning * into room; end if;
  insert into mmt_private.receipts(room_id,client_id,mutation_id,operations_hash,revision) values(p_room_id,p_client_id,p_mutation_id,operations_hash,room.revision);
  delete from mmt_private.receipts where room_id=p_room_id and (client_id,mutation_id) not in (select client_id,mutation_id from mmt_private.receipts where room_id=p_room_id order by created_at desc,mutation_id desc limit 100);
  return jsonb_build_object('ok',true,'board',room.board,'revision',room.revision);
end;
$function$;

revoke all on function public.mmt_board_create(jsonb) from public;
revoke all on function public.mmt_board_read(uuid,text,text,bigint,jsonb) from public;
revoke all on function public.mmt_board_patch(uuid,text,text,bigint,text,jsonb) from public;
grant execute on function public.mmt_board_create(jsonb) to anon,authenticated;
grant execute on function public.mmt_board_read(uuid,text,text,bigint,jsonb) to anon,authenticated;
grant execute on function public.mmt_board_patch(uuid,text,text,bigint,text,jsonb) to anon,authenticated;
notify pgrst, 'reload schema';
commit;
