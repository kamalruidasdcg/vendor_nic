PGDMP  $                    |            grse_btn_dev    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    26887    grse_btn_dev    DATABASE        CREATE DATABASE grse_btn_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE grse_btn_dev;
                postgres    false            �            1259    26993    btn_service_hybrid    TABLE       CREATE TABLE public.btn_service_hybrid (
    btn_num character varying(30) NOT NULL,
    purchasing_doc_no character varying(30) NOT NULL,
    invoice_no character varying(30) DEFAULT NULL::character varying,
    invoice_filename text NOT NULL,
    invoice_value character varying(30) DEFAULT NULL::character varying,
    debit_note character varying(15) DEFAULT NULL::character varying,
    credit_note character varying(15) DEFAULT NULL::character varying,
    debit_credit_filename text DEFAULT NULL::character varying,
    net_claim_amount character varying(15) DEFAULT NULL::character varying,
    cgst character varying(4) NOT NULL,
    sgst character varying(4) NOT NULL,
    igst character varying(4) NOT NULL,
    net_claim_amt_gst character varying(15) NOT NULL,
    vendor_name character varying(150) DEFAULT NULL::character varying,
    wdc_number character varying(30) DEFAULT NULL::character varying,
    hsn_gstn_icgrn integer,
    created_at bigint NOT NULL,
    created_by_id character varying(30) NOT NULL,
    vendor_code character varying(10) NOT NULL,
    btn_type character varying(100) NOT NULL,
    vendor_gst_no character varying(100),
    invoice_type character varying(100),
    hinderance_register_filename text,
    suppoting_invoice_filename text,
    leave_salary_bonus character varying(15) DEFAULT NULL::character varying,
    bill_certifing_authority character varying(15) DEFAULT NULL::character varying,
    invoice_date character varying(3000),
    yard character varying(20),
    net_with_gst character varying(15)
);
 &   DROP TABLE public.btn_service_hybrid;
       public         heap    postgres    false            �          0    26993    btn_service_hybrid 
   TABLE DATA           �  COPY public.btn_service_hybrid (btn_num, purchasing_doc_no, invoice_no, invoice_filename, invoice_value, debit_note, credit_note, debit_credit_filename, net_claim_amount, cgst, sgst, igst, net_claim_amt_gst, vendor_name, wdc_number, hsn_gstn_icgrn, created_at, created_by_id, vendor_code, btn_type, vendor_gst_no, invoice_type, hinderance_register_filename, suppoting_invoice_filename, leave_salary_bonus, bill_certifing_authority, invoice_date, yard, net_with_gst) FROM stdin;
    public          postgres    false    225          g           2620    28271 (   btn_service_hybrid before_update_trigger    TRIGGER     �   CREATE TRIGGER before_update_trigger BEFORE UPDATE ON public.btn_service_hybrid FOR EACH ROW EXECUTE FUNCTION public.update_sync_fields();
 A   DROP TRIGGER before_update_trigger ON public.btn_service_hybrid;
       public          postgres    false    225            �   .  x�Ś�n7����e{����4b�0Z��47��Eȶ �q��VR\QZ.Ǩ�y����˝��p���L����]^����չ%���lxbf���U�!|"=�>\�>�}�K$!����ц�����3!E����>���7�����i��y��].g?���������g�``��	������I���A���K�N:����J�����V��M��]\<�WO��j}���)����_}�kg�[v���n�|w�|�m���|��w��L��̮C7#�"T��ݧ��{��N�ˇ��=��	�z~߿t���/�ח�n��q��?u���_=u#��o�i�©�Q�0�'A�,ծC[�>�x�F�m��@���u���
>��aպ�!ڼ{�d��ha$'{�w��CU�>��6����Y���&6�����"��s�G���}�=���!*m�k`��ؓ��,E��k�������a�^���m:�$���A�3�6��!ְ�!�qݛ{��еE�����d�uO� B��>;��sR6֘��r�L�s����FA �u���)G�Wa|�ث{��(!��I���^*>�ѡ�5�Sȸs?{Y�1u�kAZ���Ne?��O������h�9��V��3:�B?�}�Edc�B�R���ym�&����	���d���&��e��+6�!�rp���ôL@`�6��2l]��a���q���	(�����+'�m�&��b;�V�=C�e��R�����k0��
�|@��W�뮀Rq�(����(�A&�WYE���S�A`�D�N@ғXY|���e�][#��#K���C2C}��|l0�]�# ��v�'�{ F[<K{���� XZ��!&�����,�1��X:�2j��+�r9'��w�1�B�<;�1��X:�2zHF�`!�b@>����*�1��
�X:R2�z?��/g�a4��-�˹t6dlNf����O����8ĠG{l+�dkdc|"� bN�)MÞ�4Ġ��g"}�ǩØ�~R�(KݐJJ�G�(���V�	a/�h��(A�C*#���'	�ՉA��:q1k��J� :a4�N���Vb��a%&cKn<�O�	b`���b6��Tlcn���h�1�ՉQOվ9h�ll��� �JEw��Q��ĉz�s66��9�Ա`n� QK�&���F����4C���5��o2��o�=6V/� 4�)Q�Qc<츸��Z���1�|ǥC4���+�FЦ�X[�8������_.ߴ     