PGDMP  8    0            	    |            grse_btn_dev    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    26887    grse_btn_dev    DATABASE        CREATE DATABASE grse_btn_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE grse_btn_dev;
                postgres    false            I           1259    37183    btn_adv_bill_hybrid    TABLE     t  CREATE TABLE public.btn_adv_bill_hybrid (
    id integer NOT NULL,
    btn_num character varying(30) NOT NULL,
    purchasing_doc_no character varying(30) NOT NULL,
    invoice_no character varying(30) DEFAULT NULL::character varying,
    invoice_filename text,
    invoice_value character varying(30) DEFAULT NULL::character varying,
    invoice_type character varying(200) DEFAULT NULL::character varying,
    invoice_supporting_filename text,
    net_claim_amount character varying(15) DEFAULT NULL::character varying NOT NULL,
    cgst character varying(4),
    sgst character varying(4),
    igst character varying(4),
    c_sdbg_date character varying(30) DEFAULT NULL::character varying,
    a_sdbg_date character varying(30) DEFAULT NULL::character varying,
    c_drawing_date character varying(30) DEFAULT NULL::character varying,
    a_drawing_date character varying(30) DEFAULT NULL::character varying,
    c_qap_date character varying(30) DEFAULT NULL::character varying,
    a_qap_date character varying(30) DEFAULT NULL::character varying,
    vendor_code character varying(10) NOT NULL,
    yard character varying(20),
    stage character varying(20),
    btn_type character varying(30),
    net_with_gst character varying(15) DEFAULT NULL::character varying NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(30) NOT NULL,
    hsn_gstn_icgrn boolean
);
 '   DROP TABLE public.btn_adv_bill_hybrid;
       public         heap    postgres    false            H           1259    37182    btn_adv_bill_hybrid_id_seq    SEQUENCE     �   CREATE SEQUENCE public.btn_adv_bill_hybrid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.btn_adv_bill_hybrid_id_seq;
       public          postgres    false    329                       0    0    btn_adv_bill_hybrid_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.btn_adv_bill_hybrid_id_seq OWNED BY public.btn_adv_bill_hybrid.id;
          public          postgres    false    328            u           2604    37186    btn_adv_bill_hybrid id    DEFAULT     �   ALTER TABLE ONLY public.btn_adv_bill_hybrid ALTER COLUMN id SET DEFAULT nextval('public.btn_adv_bill_hybrid_id_seq'::regclass);
 E   ALTER TABLE public.btn_adv_bill_hybrid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    328    329    329                      0    37183    btn_adv_bill_hybrid 
   TABLE DATA           x  COPY public.btn_adv_bill_hybrid (id, btn_num, purchasing_doc_no, invoice_no, invoice_filename, invoice_value, invoice_type, invoice_supporting_filename, net_claim_amount, cgst, sgst, igst, c_sdbg_date, a_sdbg_date, c_drawing_date, a_drawing_date, c_qap_date, a_qap_date, vendor_code, yard, stage, btn_type, net_with_gst, created_at, created_by_id, hsn_gstn_icgrn) FROM stdin;
    public          postgres    false    329   �                  0    0    btn_adv_bill_hybrid_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.btn_adv_bill_hybrid_id_seq', 1, false);
          public          postgres    false    328            �           2606    37203 ,   btn_adv_bill_hybrid btn_adv_bill_hybrid_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.btn_adv_bill_hybrid
    ADD CONSTRAINT btn_adv_bill_hybrid_pkey PRIMARY KEY (purchasing_doc_no, btn_num);
 V   ALTER TABLE ONLY public.btn_adv_bill_hybrid DROP CONSTRAINT btn_adv_bill_hybrid_pkey;
       public            postgres    false    329    329                  x������ � �     