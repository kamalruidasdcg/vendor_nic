PGDMP                      |            grse_btn_dev    16.2    16.2 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    26887    grse_btn_dev    DATABASE        CREATE DATABASE grse_btn_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE grse_btn_dev;
                postgres    false            ?           1259    28367    btn_service_certify_authority    TABLE     �  CREATE TABLE public.btn_service_certify_authority (
    id bigint NOT NULL,
    btn_num character varying(30) NOT NULL,
    entry_number character varying(20) NOT NULL,
    entry_type character varying(200) NOT NULL,
    wdc_details text,
    other_deduction character varying(15),
    deduction_remarks text,
    total_deduction character varying(15),
    net_payable_amount character varying(15),
    created_at bigint NOT NULL,
    created_by_id character varying(15) NOT NULL,
    estimated_ld character varying(15),
    retension_remarks text,
    retension_amount character varying(15) DEFAULT NULL::character varying,
    retension_rate character varying(15) DEFAULT NULL::character varying,
    max_ld character varying(15) DEFAULT NULL::character varying
);
 1   DROP TABLE public.btn_service_certify_authority;
       public         heap    postgres    false            >           1259    28366 $   btn_service_certify_authority_id_seq    SEQUENCE     �   CREATE SEQUENCE public.btn_service_certify_authority_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.btn_service_certify_authority_id_seq;
       public          postgres    false    319            �           0    0 $   btn_service_certify_authority_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.btn_service_certify_authority_id_seq OWNED BY public.btn_service_certify_authority.id;
          public          postgres    false    318            ]           2604    28370     btn_service_certify_authority id    DEFAULT     �   ALTER TABLE ONLY public.btn_service_certify_authority ALTER COLUMN id SET DEFAULT nextval('public.btn_service_certify_authority_id_seq'::regclass);
 O   ALTER TABLE public.btn_service_certify_authority ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    318    319    319            �          0    28367    btn_service_certify_authority 
   TABLE DATA             COPY public.btn_service_certify_authority (id, btn_num, entry_number, entry_type, wdc_details, other_deduction, deduction_remarks, total_deduction, net_payable_amount, created_at, created_by_id, estimated_ld, retension_remarks, retension_amount, retension_rate, max_ld) FROM stdin;
    public          postgres    false    319   �       �           0    0 $   btn_service_certify_authority_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.btn_service_certify_authority_id_seq', 21, true);
          public          postgres    false    318            �   �   x���91�ڹ�[�\�L�P
��� $nO�I��v���Ȋ��� Z�#�ml�[��o��^�����=�����resg geBAG0����Y�0aN[��JV��B��Q4�1����J3&V1�i�f;�R~��2     