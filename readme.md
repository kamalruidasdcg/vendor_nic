
<!-- OBPS PROJECT DETAILS -->

#GRSE OBPS PROJECT ----
<!-- insert into email_send_info (event_name, u_id, u_name, u_type, email_body_name) values('BTN_REJECT', null, null, 'vendor', 'BTN_REJECT') -->
1. VENDOR BILL PROCESSING ONLINE PORTAL
<!-- 
-- Table: public.sync_updates

-- DROP TABLE IF EXISTS public.sync_updates;

CREATE TABLE IF NOT EXISTS public.sync_updates
(
    id bigint NOT NULL DEFAULT nextval('sync_updates_id_seq'::regclass),
    sync_type character varying(200) COLLATE pg_catalog."default" NOT NULL,
    sync_datetime timestamp with time zone NOT NULL,
    sync_status character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_by character varying(12) COLLATE pg_catalog."default",
    CONSTRAINT sync_updates_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sync_updates
    OWNER to postgres; -->