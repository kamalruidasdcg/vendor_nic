PGDMP      1            	    |            grse_btn_dev    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    26887    grse_btn_dev    DATABASE        CREATE DATABASE grse_btn_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE grse_btn_dev;
                postgres    false            K           1259    37207    btn_adv_bill_hybrid_do    TABLE     �  CREATE TABLE public.btn_adv_bill_hybrid_do (
    id integer NOT NULL,
    btn_num character varying(15) NOT NULL,
    drg_penalty character varying(15) NOT NULL,
    net_payable_amount character varying(15) NOT NULL,
    penalty_rate character varying(3),
    penalty_ammount character varying(3),
    recomend_payment character varying(3),
    created_at bigint NOT NULL,
    created_by character varying(15)
);
 *   DROP TABLE public.btn_adv_bill_hybrid_do;
       public         heap    postgres    false            J           1259    37206    btn_adv_bill_hybrid_do_id_seq    SEQUENCE     �   CREATE SEQUENCE public.btn_adv_bill_hybrid_do_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.btn_adv_bill_hybrid_do_id_seq;
       public          postgres    false    331                       0    0    btn_adv_bill_hybrid_do_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.btn_adv_bill_hybrid_do_id_seq OWNED BY public.btn_adv_bill_hybrid_do.id;
          public          postgres    false    330            u           2604    37210    btn_adv_bill_hybrid_do id    DEFAULT     �   ALTER TABLE ONLY public.btn_adv_bill_hybrid_do ALTER COLUMN id SET DEFAULT nextval('public.btn_adv_bill_hybrid_do_id_seq'::regclass);
 H   ALTER TABLE public.btn_adv_bill_hybrid_do ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    331    330    331                      0    37207    btn_adv_bill_hybrid_do 
   TABLE DATA           �   COPY public.btn_adv_bill_hybrid_do (id, btn_num, drg_penalty, net_payable_amount, penalty_rate, penalty_ammount, recomend_payment, created_at, created_by) FROM stdin;
    public          postgres    false    331   E                  0    0    btn_adv_bill_hybrid_do_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.btn_adv_bill_hybrid_do_id_seq', 1, false);
          public          postgres    false    330            w           2606    37260 2   btn_adv_bill_hybrid_do btn_adv_bill_hybrid_do_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.btn_adv_bill_hybrid_do
    ADD CONSTRAINT btn_adv_bill_hybrid_do_pkey PRIMARY KEY (btn_num);
 \   ALTER TABLE ONLY public.btn_adv_bill_hybrid_do DROP CONSTRAINT btn_adv_bill_hybrid_do_pkey;
       public            postgres    false    331                  x������ � �     