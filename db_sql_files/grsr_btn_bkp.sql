PGDMP  .    "                |            grse_btn    16.3    16.3 +              0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    49937    grse_btn    DATABASE     �   CREATE DATABASE grse_btn WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE grse_btn;
                postgres    false            �            1259    49938    actualsubmissiondate    TABLE     ;  CREATE TABLE public.actualsubmissiondate (
    id integer NOT NULL,
    purchasing_doc_no character varying(10) NOT NULL,
    milestoneid integer NOT NULL,
    milestonetext text NOT NULL,
    actualsubmissiondate bigint NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(11) NOT NULL
);
 (   DROP TABLE public.actualsubmissiondate;
       public         heap    postgres    false            �            1259    49943    actualsubmissiondate_id_seq    SEQUENCE     �   CREATE SEQUENCE public.actualsubmissiondate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.actualsubmissiondate_id_seq;
       public          postgres    false    215                       0    0    actualsubmissiondate_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.actualsubmissiondate_id_seq OWNED BY public.actualsubmissiondate.id;
          public          postgres    false    216            �            1259    49944    auth    TABLE     �  CREATE TABLE public.auth (
    id integer NOT NULL,
    user_type integer NOT NULL,
    department_id integer,
    internal_role_id integer,
    username character varying(25) NOT NULL,
    password character varying(250) NOT NULL,
    name character varying(45) NOT NULL,
    vendor_code character varying(25) NOT NULL,
    datetime timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
    last_login_time bigint
);
    DROP TABLE public.auth;
       public         heap    postgres    false            �            1259    49948    auth_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.auth_id_seq;
       public          postgres    false    217                       0    0    auth_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.auth_id_seq OWNED BY public.auth.id;
          public          postgres    false    218            �            1259    49949    btn    TABLE     k  CREATE TABLE public.btn (
    btn_num character varying(30) NOT NULL,
    purchasing_doc_no character varying(30) NOT NULL,
    invoice_no character varying(30) DEFAULT NULL::character varying,
    invoice_filename character varying(150) NOT NULL,
    invoice_value character varying(30) DEFAULT NULL::character varying,
    cgst character varying(15) NOT NULL,
    igst character varying(15) NOT NULL,
    sgst character varying(15) NOT NULL,
    e_invoice_no character varying(30) DEFAULT NULL::character varying,
    e_invoice_filename character varying(150) DEFAULT NULL::character varying,
    debit_note character varying(15) DEFAULT NULL::character varying,
    credit_note character varying(15) DEFAULT NULL::character varying,
    debit_credit_filename character varying(150) DEFAULT NULL::character varying,
    net_claim_amount character varying(15) DEFAULT NULL::character varying,
    c_sdbg_date character varying(30) DEFAULT NULL::character varying,
    c_sdbg_filename character varying(150) DEFAULT NULL::character varying,
    a_sdbg_date character varying(30) DEFAULT NULL::character varying,
    demand_raise_filename character varying(150) DEFAULT NULL::character varying,
    gate_entry_no character varying(30) DEFAULT NULL::character varying,
    get_entry_filename character varying(150) DEFAULT NULL::character varying,
    gate_entry_date character varying(30) DEFAULT NULL::character varying,
    grn_no_1 character varying(30) DEFAULT NULL::character varying,
    grn_no_2 character varying(30) DEFAULT NULL::character varying,
    grn_no_3 character varying(30) DEFAULT NULL::character varying,
    grn_no_4 character varying(30) DEFAULT NULL::character varying,
    icgrn_no_1 character varying(30) DEFAULT NULL::character varying,
    icgrn_no_2 character varying(30) DEFAULT NULL::character varying,
    icgrn_no_3 character varying(30) DEFAULT NULL::character varying,
    icgrn_no_4 character varying(30) DEFAULT NULL::character varying,
    icgrn_total character varying(30) DEFAULT NULL::character varying,
    c_drawing_date character varying(30) DEFAULT NULL::character varying,
    a_drawing_date character varying(30) DEFAULT NULL::character varying,
    c_qap_date character varying(30) DEFAULT NULL::character varying,
    a_qap_date character varying(30) DEFAULT NULL::character varying,
    c_ilms_date character varying(30) DEFAULT NULL::character varying,
    a_ilms_date character varying(30) DEFAULT NULL::character varying,
    pbg_filename character varying(150) DEFAULT NULL::character varying,
    hsn_gstn_icgrn integer,
    ld_gate_entry_date character varying(30) DEFAULT NULL::character varying,
    ld_contractual_date character varying(30) DEFAULT NULL::character varying,
    ld_amount character varying(15) NOT NULL,
    c_drawing_date_do character varying(30) DEFAULT NULL::character varying,
    a_drawing_date_do character varying(30) DEFAULT NULL::character varying,
    drawing_penalty character varying(15) DEFAULT NULL::character varying,
    c_qap_date_do character varying(30) DEFAULT NULL::character varying,
    a_qap_date_do character varying(30) DEFAULT NULL::character varying,
    qap_penalty character varying(15) DEFAULT NULL::character varying,
    c_ilms_date_do character varying(30) DEFAULT NULL::character varying,
    a_ilms_date_do character varying(30) DEFAULT NULL::character varying,
    ilms_penalty character varying(15) DEFAULT NULL::character varying,
    other_penalty character varying(15) DEFAULT NULL::character varying,
    total_penalty character varying(15) NOT NULL,
    net_payable_amount character varying(15) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(30) NOT NULL,
    vendor_code character varying(10) NOT NULL,
    icgrn_nos text NOT NULL,
    grn_nos text NOT NULL,
    gst_rate character varying(10) NOT NULL,
    btn_type character varying(20) NOT NULL
);
    DROP TABLE public.btn;
       public         heap    postgres    false            �            1259    49997    btn_do    TABLE     Q  CREATE TABLE public.btn_do (
    btn_num character varying(15) NOT NULL,
    contractual_ld character varying(45) NOT NULL,
    ld_amount character varying(15) NOT NULL,
    drg_penalty character varying(15) NOT NULL,
    qap_penalty character varying(15) NOT NULL,
    ilms_penalty character varying(15) NOT NULL,
    other_deduction character varying(15) NOT NULL,
    total_deduction character varying(15) NOT NULL,
    net_payable_amout character varying(15) NOT NULL,
    created_at bigint,
    created_by character varying(15) NOT NULL,
    assigned_to character varying(20) NOT NULL
);
    DROP TABLE public.btn_do;
       public         heap    postgres    false            �            1259    50000    cdhdr    TABLE     f  CREATE TABLE public.cdhdr (
    objectclas character varying(15) NOT NULL,
    objectid character varying(90) NOT NULL,
    changenr character varying(10) NOT NULL,
    username character varying(12) DEFAULT NULL::character varying,
    udate date,
    utime time(0) without time zone DEFAULT NULL::time without time zone,
    tcode character varying(20) DEFAULT NULL::character varying,
    planchngnr character varying(12) DEFAULT NULL::character varying,
    act_chngno character varying(10) DEFAULT NULL::character varying,
    was_plannd character varying(1) DEFAULT NULL::character varying,
    change_ind character varying(1) DEFAULT NULL::character varying,
    langu character varying(1) DEFAULT NULL::character varying,
    version character varying(3) DEFAULT NULL::character varying,
    _dataaging date,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.cdhdr;
       public         heap    postgres    false                       0    0    COLUMN cdhdr.objectclas    COMMENT     =   COMMENT ON COLUMN public.cdhdr.objectclas IS 'Object class';
          public          postgres    false    221                       0    0    COLUMN cdhdr.objectid    COMMENT     ;   COMMENT ON COLUMN public.cdhdr.objectid IS 'Object Value';
          public          postgres    false    221                       0    0    COLUMN cdhdr.changenr    COMMENT     H   COMMENT ON COLUMN public.cdhdr.changenr IS 'Change Number of Document';
          public          postgres    false    221                       0    0    COLUMN cdhdr.username    COMMENT     c   COMMENT ON COLUMN public.cdhdr.username IS 'User Name of Person Making Change in Change Document';
          public          postgres    false    221                       0    0    COLUMN cdhdr.udate    COMMENT     P   COMMENT ON COLUMN public.cdhdr.udate IS 'Creation date of the change document';
          public          postgres    false    221                       0    0    COLUMN cdhdr.utime    COMMENT     8   COMMENT ON COLUMN public.cdhdr.utime IS 'Time changed';
          public          postgres    false    221                       0    0    COLUMN cdhdr.tcode    COMMENT     R   COMMENT ON COLUMN public.cdhdr.tcode IS 'Transaction in which a change was made';
          public          postgres    false    221                       0    0    COLUMN cdhdr.planchngnr    COMMENT     F   COMMENT ON COLUMN public.cdhdr.planchngnr IS 'Planned change number';
          public          postgres    false    221                       0    0    COLUMN cdhdr.act_chngno    COMMENT     e   COMMENT ON COLUMN public.cdhdr.act_chngno IS 'Change number of the document created by this change';
          public          postgres    false    221                       0    0    COLUMN cdhdr.was_plannd    COMMENT     Z   COMMENT ON COLUMN public.cdhdr.was_plannd IS 'Flag: Change created from planned changes';
          public          postgres    false    221                       0    0    COLUMN cdhdr.change_ind    COMMENT     \   COMMENT ON COLUMN public.cdhdr.change_ind IS 'Application object change type (U, I, E, D)';
          public          postgres    false    221                       0    0    COLUMN cdhdr.langu    COMMENT     8   COMMENT ON COLUMN public.cdhdr.langu IS 'Language Key';
          public          postgres    false    221                       0    0    COLUMN cdhdr.version    COMMENT     :   COMMENT ON COLUMN public.cdhdr.version IS '3-Byte field';
          public          postgres    false    221                       0    0    COLUMN cdhdr._dataaging    COMMENT     Q   COMMENT ON COLUMN public.cdhdr._dataaging IS 'Data Filter Value for Data Aging';
          public          postgres    false    221                       0    0    COLUMN cdhdr.created_at    COMMENT     =   COMMENT ON COLUMN public.cdhdr.created_at IS 'Created time';
          public          postgres    false    221                       0    0    COLUMN cdhdr.last_changed_at    COMMENT     F   COMMENT ON COLUMN public.cdhdr.last_changed_at IS 'Last change time';
          public          postgres    false    221            �            1259    50012    cdpos    TABLE     w  CREATE TABLE public.cdpos (
    objectclas character varying(15) NOT NULL,
    objectid character varying(90) NOT NULL,
    changenr character varying(10) NOT NULL,
    tabname character varying(30) NOT NULL,
    tabkey character varying(70) NOT NULL,
    fname character varying(30) NOT NULL,
    chngind character varying(1) NOT NULL,
    text_case character varying(1) DEFAULT NULL::character varying,
    unit_old character varying(3) DEFAULT NULL::character varying,
    unit_new character varying(3) DEFAULT NULL::character varying,
    cuky_old character varying(5) DEFAULT NULL::character varying,
    cuky_new character varying(5) DEFAULT NULL::character varying,
    value_new character varying(254) DEFAULT NULL::character varying,
    value_old character varying(254) DEFAULT NULL::character varying,
    _dataaging date,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.cdpos;
       public         heap    postgres    false                       0    0    COLUMN cdpos.objectclas    COMMENT     =   COMMENT ON COLUMN public.cdpos.objectclas IS 'Object class';
          public          postgres    false    222                       0    0    COLUMN cdpos.objectid    COMMENT     ;   COMMENT ON COLUMN public.cdpos.objectid IS 'Object value';
          public          postgres    false    222                        0    0    COLUMN cdpos.changenr    COMMENT     E   COMMENT ON COLUMN public.cdpos.changenr IS 'Document change number';
          public          postgres    false    222            !           0    0    COLUMN cdpos.tabname    COMMENT     8   COMMENT ON COLUMN public.cdpos.tabname IS 'Table Name';
          public          postgres    false    222            "           0    0    COLUMN cdpos.tabkey    COMMENT     E   COMMENT ON COLUMN public.cdpos.tabkey IS 'Changed table record key';
          public          postgres    false    222            #           0    0    COLUMN cdpos.fname    COMMENT     6   COMMENT ON COLUMN public.cdpos.fname IS 'Field Name';
          public          postgres    false    222            $           0    0    COLUMN cdpos.chngind    COMMENT     F   COMMENT ON COLUMN public.cdpos.chngind IS 'Change Type (U, I, S, D)';
          public          postgres    false    222            %           0    0    COLUMN cdpos.text_case    COMMENT     C   COMMENT ON COLUMN public.cdpos.text_case IS 'Flag: X=Text change';
          public          postgres    false    222            &           0    0    COLUMN cdpos.unit_old    COMMENT     V   COMMENT ON COLUMN public.cdpos.unit_old IS 'Change documents, unit referenced (Old)';
          public          postgres    false    222            '           0    0    COLUMN cdpos.unit_new    COMMENT     V   COMMENT ON COLUMN public.cdpos.unit_new IS 'Change documents, unit referenced (New)';
          public          postgres    false    222            (           0    0    COLUMN cdpos.cuky_old    COMMENT     Z   COMMENT ON COLUMN public.cdpos.cuky_old IS 'Change documents, referenced currency (Old)';
          public          postgres    false    222            )           0    0    COLUMN cdpos.cuky_new    COMMENT     Z   COMMENT ON COLUMN public.cdpos.cuky_new IS 'Change documents, referenced currency (New)';
          public          postgres    false    222            *           0    0    COLUMN cdpos.value_new    COMMENT     M   COMMENT ON COLUMN public.cdpos.value_new IS 'New contents of changed field';
          public          postgres    false    222            +           0    0    COLUMN cdpos.value_old    COMMENT     M   COMMENT ON COLUMN public.cdpos.value_old IS 'Old contents of changed field';
          public          postgres    false    222            ,           0    0    COLUMN cdpos._dataaging    COMMENT     Q   COMMENT ON COLUMN public.cdpos._dataaging IS 'Data Filter Value for Data Aging';
          public          postgres    false    222            -           0    0    COLUMN cdpos.created_at    COMMENT     =   COMMENT ON COLUMN public.cdpos.created_at IS 'Created time';
          public          postgres    false    222            .           0    0    COLUMN cdpos.last_changed_at    COMMENT     F   COMMENT ON COLUMN public.cdpos.last_changed_at IS 'Last change time';
          public          postgres    false    222            �            1259    50024    demande_management    TABLE     
  CREATE TABLE public.demande_management (
    id integer NOT NULL,
    status character varying(10) NOT NULL,
    action_type character varying(60) NOT NULL,
    reference_no character varying(30) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    line_item_no integer,
    request_amount integer,
    recived_quantity integer DEFAULT 0,
    demand text NOT NULL,
    delivery_date bigint,
    created_at bigint,
    created_by_id character varying(20) DEFAULT NULL::character varying,
    remarks text
);
 &   DROP TABLE public.demande_management;
       public         heap    postgres    false            �            1259    50031    demande_management_id_seq    SEQUENCE     �   CREATE SEQUENCE public.demande_management_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.demande_management_id_seq;
       public          postgres    false    223            /           0    0    demande_management_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.demande_management_id_seq OWNED BY public.demande_management.id;
          public          postgres    false    224            �            1259    50032    department_wise_log    TABLE     	  CREATE TABLE public.department_wise_log (
    id integer NOT NULL,
    user_id integer NOT NULL,
    vendor_code character varying(10) DEFAULT NULL::character varying,
    depertment character varying(100) DEFAULT NULL::character varying,
    action character varying(100) DEFAULT NULL::character varying,
    dept_table_id integer,
    remarks text NOT NULL,
    purchasing_doc_no character varying(10) DEFAULT NULL::character varying,
    created_at bigint NOT NULL,
    created_by_id character varying(11) NOT NULL
);
 '   DROP TABLE public.department_wise_log;
       public         heap    postgres    false            �            1259    50041    department_wise_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_wise_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.department_wise_log_id_seq;
       public          postgres    false    225            0           0    0    department_wise_log_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.department_wise_log_id_seq OWNED BY public.department_wise_log.id;
          public          postgres    false    226            �            1259    50042    depertment_master    TABLE     m   CREATE TABLE public.depertment_master (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);
 %   DROP TABLE public.depertment_master;
       public         heap    postgres    false            �            1259    50045    depertment_master_id_seq    SEQUENCE     �   CREATE SEQUENCE public.depertment_master_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.depertment_master_id_seq;
       public          postgres    false    227            1           0    0    depertment_master_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.depertment_master_id_seq OWNED BY public.depertment_master.id;
          public          postgres    false    228            �            1259    50046    drawing    TABLE     c  CREATE TABLE public.drawing (
    id integer NOT NULL,
    reference_no character varying(60) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    vendor_code character varying(100) NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    actiontype character varying(100) DEFAULT NULL::character varying,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
    DROP TABLE public.drawing;
       public         heap    postgres    false            �            1259    50054    drawing_id_seq    SEQUENCE     �   CREATE SEQUENCE public.drawing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.drawing_id_seq;
       public          postgres    false    229            2           0    0    drawing_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.drawing_id_seq OWNED BY public.drawing.id;
          public          postgres    false    230            �            1259    50055    ekko    TABLE     u  CREATE TABLE public.ekko (
    ebeln character varying(10) NOT NULL,
    bukrs character varying(4) NOT NULL,
    bstyp character varying(1) DEFAULT NULL::character varying,
    bsart character varying(4) DEFAULT NULL::character varying,
    loekz character varying(1) DEFAULT NULL::character varying,
    aedat date,
    ernam character varying(12) DEFAULT NULL::character varying,
    lifnr character varying(10) DEFAULT NULL::character varying,
    ekorg character varying(4) DEFAULT NULL::character varying,
    ekgrp character varying(3) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.ekko;
       public         heap    postgres    false            3           0    0    COLUMN ekko.ebeln    COMMENT     E   COMMENT ON COLUMN public.ekko.ebeln IS 'Purchasing Document Number';
          public          postgres    false    231            4           0    0    COLUMN ekko.bukrs    COMMENT     7   COMMENT ON COLUMN public.ekko.bukrs IS 'Company Code';
          public          postgres    false    231            5           0    0    COLUMN ekko.bstyp    COMMENT     G   COMMENT ON COLUMN public.ekko.bstyp IS 'Purchasing Document Category';
          public          postgres    false    231            6           0    0    COLUMN ekko.bsart    COMMENT     C   COMMENT ON COLUMN public.ekko.bsart IS 'Purchasing Document Type';
          public          postgres    false    231            7           0    0    COLUMN ekko.loekz    COMMENT     T   COMMENT ON COLUMN public.ekko.loekz IS 'Deletion Indicator in Purchasing Document';
          public          postgres    false    231            8           0    0    COLUMN ekko.aedat    COMMENT     K   COMMENT ON COLUMN public.ekko.aedat IS 'Date on Which Record Was Created';
          public          postgres    false    231            9           0    0    COLUMN ekko.ernam    COMMENT     L   COMMENT ON COLUMN public.ekko.ernam IS 'Name Of Person Who Created Object';
          public          postgres    false    231            :           0    0    COLUMN ekko.lifnr    COMMENT     @   COMMENT ON COLUMN public.ekko.lifnr IS 'Vendor Account Number';
          public          postgres    false    231            ;           0    0    COLUMN ekko.ekorg    COMMENT     B   COMMENT ON COLUMN public.ekko.ekorg IS 'Purchasing Organization';
          public          postgres    false    231            <           0    0    COLUMN ekko.ekgrp    COMMENT     ;   COMMENT ON COLUMN public.ekko.ekgrp IS 'Purchasing Group';
          public          postgres    false    231            =           0    0    COLUMN ekko.created_at    COMMENT     <   COMMENT ON COLUMN public.ekko.created_at IS 'Created time';
          public          postgres    false    231            >           0    0    COLUMN ekko.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.ekko.last_changed_at IS 'Last change time';
          public          postgres    false    231            �            1259    50065    ekpo    TABLE     -  CREATE TABLE public.ekpo (
    ebeln character varying(10) NOT NULL,
    ebelp integer NOT NULL,
    loekz character varying(1) DEFAULT NULL::character varying,
    statu character varying(1) DEFAULT NULL::character varying,
    aedat character varying(10) DEFAULT NULL::character varying,
    txz01 character varying(40) DEFAULT NULL::character varying,
    matnr character varying(18) DEFAULT NULL::character varying,
    bukrs character varying(4) DEFAULT NULL::character varying,
    werks character varying(4) DEFAULT NULL::character varying,
    lgort character varying(4) DEFAULT NULL::character varying,
    matkl character varying(9) DEFAULT NULL::character varying,
    ktmng integer,
    menge numeric(13,3) DEFAULT NULL::numeric,
    meins character varying(4) DEFAULT NULL::character varying,
    netpr character varying(11) DEFAULT NULL::character varying,
    netwr character varying(13) DEFAULT NULL::character varying,
    mwskz character varying(2) DEFAULT NULL::character varying,
    eindt date,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.ekpo;
       public         heap    postgres    false            ?           0    0    COLUMN ekpo.ebeln    COMMENT     E   COMMENT ON COLUMN public.ekpo.ebeln IS 'Purchasing Document Number';
          public          postgres    false    232            @           0    0    COLUMN ekpo.ebelp    COMMENT     M   COMMENT ON COLUMN public.ekpo.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    232            A           0    0    COLUMN ekpo.loekz    COMMENT     T   COMMENT ON COLUMN public.ekpo.loekz IS 'Deletion Indicator in Purchasing Document';
          public          postgres    false    232            B           0    0    COLUMN ekpo.statu    COMMENT     5   COMMENT ON COLUMN public.ekpo.statu IS 'RFQ status';
          public          postgres    false    232            C           0    0    COLUMN ekpo.aedat    COMMENT     O   COMMENT ON COLUMN public.ekpo.aedat IS 'Purchasing Document Item Change Date';
          public          postgres    false    232            D           0    0    COLUMN ekpo.txz01    COMMENT     :   COMMENT ON COLUMN public.ekpo.txz01 IS 'Material Number';
          public          postgres    false    232            E           0    0    COLUMN ekpo.matnr    COMMENT     :   COMMENT ON COLUMN public.ekpo.matnr IS 'Material Number';
          public          postgres    false    232            F           0    0    COLUMN ekpo.bukrs    COMMENT     7   COMMENT ON COLUMN public.ekpo.bukrs IS 'Company Code';
          public          postgres    false    232            G           0    0    COLUMN ekpo.werks    COMMENT     0   COMMENT ON COLUMN public.ekpo.werks IS 'Plant';
          public          postgres    false    232            H           0    0    COLUMN ekpo.lgort    COMMENT     ;   COMMENT ON COLUMN public.ekpo.lgort IS 'Storage Location';
          public          postgres    false    232            I           0    0    COLUMN ekpo.matkl    COMMENT     9   COMMENT ON COLUMN public.ekpo.matkl IS 'Material Group';
          public          postgres    false    232            J           0    0    COLUMN ekpo.ktmng    COMMENT     :   COMMENT ON COLUMN public.ekpo.ktmng IS 'Target Quantity';
          public          postgres    false    232            K           0    0    COLUMN ekpo.menge    COMMENT     B   COMMENT ON COLUMN public.ekpo.menge IS 'Purchase Order Quantity';
          public          postgres    false    232            L           0    0    COLUMN ekpo.meins    COMMENT     I   COMMENT ON COLUMN public.ekpo.meins IS 'Purchase Order Unit of Measure';
          public          postgres    false    232            M           0    0    COLUMN ekpo.netpr    COMMENT     b   COMMENT ON COLUMN public.ekpo.netpr IS 'Net Price in Purchasing Document (in Document Currency)';
          public          postgres    false    232            N           0    0    COLUMN ekpo.netwr    COMMENT     I   COMMENT ON COLUMN public.ekpo.netwr IS 'Net Order Value in PO Currency';
          public          postgres    false    232            O           0    0    COLUMN ekpo.mwskz    COMMENT     F   COMMENT ON COLUMN public.ekpo.mwskz IS 'Tax on sales/purchases code';
          public          postgres    false    232            P           0    0    COLUMN ekpo.created_at    COMMENT     <   COMMENT ON COLUMN public.ekpo.created_at IS 'Created time';
          public          postgres    false    232            Q           0    0    COLUMN ekpo.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.ekpo.last_changed_at IS 'Last change time';
          public          postgres    false    232            �            1259    50082    emp_department_list    TABLE     v  CREATE TABLE public.emp_department_list (
    id integer NOT NULL,
    dept_name character varying(20) NOT NULL,
    dept_id character varying(5) NOT NULL,
    internal_role_id integer,
    sub_dept_name character varying(20) DEFAULT NULL::character varying,
    sub_dept_id character varying(20) DEFAULT NULL::character varying,
    emp_id character varying(8) NOT NULL
);
 '   DROP TABLE public.emp_department_list;
       public         heap    postgres    false            �            1259    50087    emp_department_list_id_seq    SEQUENCE     �   CREATE SEQUENCE public.emp_department_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.emp_department_list_id_seq;
       public          postgres    false    233            R           0    0    emp_department_list_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.emp_department_list_id_seq OWNED BY public.emp_department_list.id;
          public          postgres    false    234            �            1259    50088    essr    TABLE     �  CREATE TABLE public.essr (
    lblni character varying(10) NOT NULL,
    lblne character varying(16) DEFAULT NULL::character varying,
    ernam character varying(12) DEFAULT NULL::character varying,
    erdat date,
    aedat date,
    aenam character varying(12) DEFAULT NULL::character varying,
    sbnamag character varying(12) DEFAULT NULL::character varying,
    sbnaman character varying(12) DEFAULT NULL::character varying,
    dlort character varying(25) DEFAULT NULL::character varying,
    lbldt date,
    lzvon date,
    lzbis date,
    lwert character varying(11) DEFAULT NULL::character varying,
    uwert character varying(11) DEFAULT NULL::character varying,
    unplv character varying(11) DEFAULT NULL::character varying,
    waers character varying(5) DEFAULT NULL::character varying,
    packno integer,
    txz01 character varying(40) DEFAULT NULL::character varying,
    ebeln character varying(10) DEFAULT NULL::character varying,
    ebelp integer,
    loekz character varying(1) DEFAULT NULL::character varying,
    kzabn character varying(1) DEFAULT NULL::character varying,
    final character varying(1) DEFAULT NULL::character varying,
    frggr character varying(2) DEFAULT NULL::character varying,
    frgsx character varying(2) DEFAULT NULL::character varying,
    frgkl character varying(1) DEFAULT NULL::character varying,
    frgzu character varying(8) DEFAULT NULL::character varying,
    frgrl character varying(1) DEFAULT NULL::character varying,
    f_lock character varying(1) DEFAULT NULL::character varying,
    pwwe numeric(3,3) DEFAULT NULL::numeric,
    pwfr numeric(3,3) DEFAULT NULL::numeric,
    bldat date,
    budat date,
    xblnr character varying(16) DEFAULT NULL::character varying,
    bktxt character varying(25) DEFAULT NULL::character varying,
    knttp character varying(1) DEFAULT NULL::character varying,
    kzvbr character varying(1) DEFAULT NULL::character varying,
    netwr character varying(11) DEFAULT NULL::character varying,
    banfn character varying(10) DEFAULT NULL::character varying,
    bnfpo integer,
    warpl character varying(12) DEFAULT NULL::character varying,
    wapos character varying(16) DEFAULT NULL::character varying,
    abnum integer,
    fknum character varying(10) DEFAULT NULL::character varying,
    fkpos integer,
    user1 character varying(20) DEFAULT NULL::character varying,
    user2 character varying(20) DEFAULT NULL::character varying,
    navnw character varying(11) DEFAULT NULL::character varying,
    spec_no character varying(10) DEFAULT NULL::character varying,
    cuobj bigint,
    lemin character varying(1) DEFAULT NULL::character varying,
    comp_date date,
    manhrs numeric(4,3) DEFAULT NULL::numeric,
    rspt numeric(3,3) DEFAULT NULL::numeric,
    drsbm numeric(3,3) DEFAULT NULL::numeric,
    qaps numeric(3,3) DEFAULT NULL::numeric,
    ldel numeric(3,3) DEFAULT NULL::numeric,
    prpmd numeric(3,3) DEFAULT NULL::numeric,
    spcim numeric(3,3) DEFAULT NULL::numeric,
    disbm numeric(3,3) DEFAULT NULL::numeric,
    sreng numeric(3,3) DEFAULT NULL::numeric,
    prmta numeric(3,3) DEFAULT NULL::numeric,
    rejre numeric(3,3) DEFAULT NULL::numeric,
    wdc character varying(25) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.essr;
       public         heap    postgres    false            S           0    0    COLUMN essr.lblni    COMMENT     =   COMMENT ON COLUMN public.essr.lblni IS 'Entry Sheet Number';
          public          postgres    false    235            T           0    0    COLUMN essr.lblne    COMMENT     F   COMMENT ON COLUMN public.essr.lblne IS 'External Entry Sheet Number';
          public          postgres    false    235            U           0    0    COLUMN essr.ernam    COMMENT     ]   COMMENT ON COLUMN public.essr.ernam IS 'Name of Person Responsible for Creating the Object';
          public          postgres    false    235            V           0    0    COLUMN essr.erdat    COMMENT     K   COMMENT ON COLUMN public.essr.erdat IS 'Date on Which Record Was Created';
          public          postgres    false    235            W           0    0    COLUMN essr.aedat    COMMENT     :   COMMENT ON COLUMN public.essr.aedat IS 'Last Changed On';
          public          postgres    false    235            X           0    0    COLUMN essr.aenam    COMMENT     L   COMMENT ON COLUMN public.essr.aenam IS 'Name of Person Who Changed Object';
          public          postgres    false    235            Y           0    0    COLUMN essr.sbnamag    COMMENT     L   COMMENT ON COLUMN public.essr.sbnamag IS 'Person Responsible (Internally)';
          public          postgres    false    235            Z           0    0    COLUMN essr.sbnaman    COMMENT     L   COMMENT ON COLUMN public.essr.sbnaman IS 'Person Responsible (Externally)';
          public          postgres    false    235            [           0    0    COLUMN essr.dlort    COMMENT     O   COMMENT ON COLUMN public.essr.dlort IS 'Location Where Service Was Performed';
          public          postgres    false    235            \           0    0    COLUMN essr.lbldt    COMMENT     N   COMMENT ON COLUMN public.essr.lbldt IS 'Price Reference Date of Entry Sheet';
          public          postgres    false    235            ]           0    0    COLUMN essr.lzvon    COMMENT     1   COMMENT ON COLUMN public.essr.lzvon IS 'Period';
          public          postgres    false    235            ^           0    0    COLUMN essr.lzbis    COMMENT     8   COMMENT ON COLUMN public.essr.lzbis IS 'End of period';
          public          postgres    false    235            _           0    0    COLUMN essr.lwert    COMMENT     <   COMMENT ON COLUMN public.essr.lwert IS 'Value of Services';
          public          postgres    false    235            `           0    0    COLUMN essr.uwert    COMMENT     J   COMMENT ON COLUMN public.essr.uwert IS 'Portion from Unplanned Services';
          public          postgres    false    235            a           0    0    COLUMN essr.unplv    COMMENT     `   COMMENT ON COLUMN public.essr.unplv IS 'Portion Unplanned Value Without Reference to Contract';
          public          postgres    false    235            b           0    0    COLUMN essr.waers    COMMENT     7   COMMENT ON COLUMN public.essr.waers IS 'Currency Key';
          public          postgres    false    235            c           0    0    COLUMN essr.packno    COMMENT     :   COMMENT ON COLUMN public.essr.packno IS 'Package number';
          public          postgres    false    235            d           0    0    COLUMN essr.txz01    COMMENT     L   COMMENT ON COLUMN public.essr.txz01 IS 'Short Text of Service Entry Sheet';
          public          postgres    false    235            e           0    0    COLUMN essr.ebeln    COMMENT     E   COMMENT ON COLUMN public.essr.ebeln IS 'Purchasing Document Number';
          public          postgres    false    235            f           0    0    COLUMN essr.ebelp    COMMENT     M   COMMENT ON COLUMN public.essr.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    235            g           0    0    COLUMN essr.loekz    COMMENT     L   COMMENT ON COLUMN public.essr.loekz IS 'Deletion indicator in entry sheet';
          public          postgres    false    235            h           0    0    COLUMN essr.kzabn    COMMENT     ?   COMMENT ON COLUMN public.essr.kzabn IS 'Acceptance indicator';
          public          postgres    false    235            i           0    0    COLUMN essr.final    COMMENT     G   COMMENT ON COLUMN public.essr.final IS 'Indicator: Final Entry Sheet';
          public          postgres    false    235            j           0    0    COLUMN essr.frggr    COMMENT     8   COMMENT ON COLUMN public.essr.frggr IS 'Release group';
          public          postgres    false    235            k           0    0    COLUMN essr.frgsx    COMMENT     ;   COMMENT ON COLUMN public.essr.frgsx IS 'Release Strategy';
          public          postgres    false    235            l           0    0    COLUMN essr.frgkl    COMMENT     I   COMMENT ON COLUMN public.essr.frgkl IS 'Release indicator: Entry sheet';
          public          postgres    false    235            m           0    0    COLUMN essr.frgzu    COMMENT     8   COMMENT ON COLUMN public.essr.frgzu IS 'Release State';
          public          postgres    false    235            n           0    0    COLUMN essr.frgrl    COMMENT     N   COMMENT ON COLUMN public.essr.frgrl IS 'Release Not Yet Completely Effected';
          public          postgres    false    235            o           0    0    COLUMN essr.f_lock    COMMENT     H   COMMENT ON COLUMN public.essr.f_lock IS 'Block Release of Entry Sheet';
          public          postgres    false    235            p           0    0    COLUMN essr.pwwe    COMMENT     N   COMMENT ON COLUMN public.essr.pwwe IS 'Points score for quality of services';
          public          postgres    false    235            q           0    0    COLUMN essr.pwfr    COMMENT     K   COMMENT ON COLUMN public.essr.pwfr IS 'Points score for on-time delivery';
          public          postgres    false    235            r           0    0    COLUMN essr.bldat    COMMENT     D   COMMENT ON COLUMN public.essr.bldat IS 'Document Date in Document';
          public          postgres    false    235            s           0    0    COLUMN essr.budat    COMMENT     G   COMMENT ON COLUMN public.essr.budat IS 'Posting Date in the Document';
          public          postgres    false    235            t           0    0    COLUMN essr.xblnr    COMMENT     D   COMMENT ON COLUMN public.essr.xblnr IS 'Reference Document Number';
          public          postgres    false    235            u           0    0    COLUMN essr.bktxt    COMMENT     ?   COMMENT ON COLUMN public.essr.bktxt IS 'Document Header Text';
          public          postgres    false    235            v           0    0    COLUMN essr.knttp    COMMENT     F   COMMENT ON COLUMN public.essr.knttp IS 'Account Assignment Category';
          public          postgres    false    235            w           0    0    COLUMN essr.kzvbr    COMMENT     >   COMMENT ON COLUMN public.essr.kzvbr IS 'Consumption posting';
          public          postgres    false    235            x           0    0    COLUMN essr.netwr    COMMENT     C   COMMENT ON COLUMN public.essr.netwr IS 'Net Value of Entry Sheet';
          public          postgres    false    235            y           0    0    COLUMN essr.banfn    COMMENT     F   COMMENT ON COLUMN public.essr.banfn IS 'Purchase Requisition Number';
          public          postgres    false    235            z           0    0    COLUMN essr.bnfpo    COMMENT     N   COMMENT ON COLUMN public.essr.bnfpo IS 'Item number of purchase requisition';
          public          postgres    false    235            {           0    0    COLUMN essr.warpl    COMMENT     ;   COMMENT ON COLUMN public.essr.warpl IS 'Maintenance Plan';
          public          postgres    false    235            |           0    0    COLUMN essr.wapos    COMMENT     ;   COMMENT ON COLUMN public.essr.wapos IS 'Maintenance Item';
          public          postgres    false    235            }           0    0    COLUMN essr.abnum    COMMENT     G   COMMENT ON COLUMN public.essr.abnum IS 'Maintenance Plan Call Number';
          public          postgres    false    235            ~           0    0    COLUMN essr.fknum    COMMENT     ?   COMMENT ON COLUMN public.essr.fknum IS 'Shipment Cost Number';
          public          postgres    false    235                       0    0    COLUMN essr.fkpos    COMMENT     >   COMMENT ON COLUMN public.essr.fkpos IS 'Shipment costs item';
          public          postgres    false    235            �           0    0    COLUMN essr.user1    COMMENT     d   COMMENT ON COLUMN public.essr.user1 IS 'Technical Reference Field for External Entry Sheet Number';
          public          postgres    false    235            �           0    0    COLUMN essr.user2    COMMENT     J   COMMENT ON COLUMN public.essr.user2 IS 'User field: Service entry sheet';
          public          postgres    false    235            �           0    0    COLUMN essr.navnw    COMMENT     C   COMMENT ON COLUMN public.essr.navnw IS 'Non-deductible input tax';
          public          postgres    false    235            �           0    0    COLUMN essr.spec_no    COMMENT     \   COMMENT ON COLUMN public.essr.spec_no IS 'Number of a Set of Model Service Specifications';
          public          postgres    false    235            �           0    0    COLUMN essr.cuobj    COMMENT     Q   COMMENT ON COLUMN public.essr.cuobj IS 'Configuration (internal object number)';
          public          postgres    false    235            �           0    0    COLUMN essr.lemin    COMMENT     <   COMMENT ON COLUMN public.essr.lemin IS 'Returns Indicator';
          public          postgres    false    235            �           0    0    COLUMN essr.comp_date    COMMENT     3   COMMENT ON COLUMN public.essr.comp_date IS 'Date';
          public          postgres    false    235            �           0    0    COLUMN essr.manhrs    COMMENT     5   COMMENT ON COLUMN public.essr.manhrs IS 'Man Hours';
          public          postgres    false    235            �           0    0    COLUMN essr.rspt    COMMENT     7   COMMENT ON COLUMN public.essr.rspt IS 'Response Time';
          public          postgres    false    235            �           0    0    COLUMN essr.drsbm    COMMENT     =   COMMENT ON COLUMN public.essr.drsbm IS 'Drawing Submission';
          public          postgres    false    235            �           0    0    COLUMN essr.qaps    COMMENT     8   COMMENT ON COLUMN public.essr.qaps IS 'QAP Submission';
          public          postgres    false    235            �           0    0    COLUMN essr.ldel    COMMENT     >   COMMENT ON COLUMN public.essr.ldel IS 'LIST OF DELIVERABLES';
          public          postgres    false    235            �           0    0    COLUMN essr.prpmd    COMMENT     ?   COMMENT ON COLUMN public.essr.prpmd IS 'Prmptns in disptchng';
          public          postgres    false    235            �           0    0    COLUMN essr.spcim    COMMENT     ?   COMMENT ON COLUMN public.essr.spcim IS 'Suppl of correct itm';
          public          postgres    false    235            �           0    0    COLUMN essr.disbm    COMMENT     >   COMMENT ON COLUMN public.essr.disbm IS 'Doc./Inv submission';
          public          postgres    false    235            �           0    0    COLUMN essr.sreng    COMMENT     <   COMMENT ON COLUMN public.essr.sreng IS 'service enginners';
          public          postgres    false    235            �           0    0    COLUMN essr.prmta    COMMENT     >   COMMENT ON COLUMN public.essr.prmta IS 'Promtns inTrial act';
          public          postgres    false    235            �           0    0    COLUMN essr.rejre    COMMENT     ?   COMMENT ON COLUMN public.essr.rejre IS 'Rejction/replacement';
          public          postgres    false    235            �           0    0    COLUMN essr.wdc    COMMENT     >   COMMENT ON COLUMN public.essr.wdc IS 'Work Done Certificate';
          public          postgres    false    235            �           0    0    COLUMN essr.created_at    COMMENT     <   COMMENT ON COLUMN public.essr.created_at IS 'Created time';
          public          postgres    false    235            �           0    0    COLUMN essr.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.essr.last_changed_at IS 'Last change time';
          public          postgres    false    235            �            1259    50140    generic_log    TABLE     �  CREATE TABLE public.generic_log (
    id integer NOT NULL,
    source character varying(200) NOT NULL,
    req_url character varying(200) NOT NULL,
    req_method character varying(200) NOT NULL,
    status_code character varying(10) NOT NULL,
    msg text NOT NULL,
    stack text NOT NULL,
    created_at bigint NOT NULL,
    create_at_dt timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.generic_log;
       public         heap    postgres    false            �            1259    50146    generic_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.generic_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.generic_log_id_seq;
       public          postgres    false    236            �           0    0    generic_log_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.generic_log_id_seq OWNED BY public.generic_log.id;
          public          postgres    false    237            �            1259    50147    hr    TABLE       CREATE TABLE public.hr (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) DEFAULT NULL::character varying,
    action_type character varying(40) DEFAULT NULL::character varying,
    file_name character varying(300) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
    DROP TABLE public.hr;
       public         heap    postgres    false            �            1259    50156    hr_compliance    TABLE     i  CREATE TABLE public.hr_compliance (
    id integer NOT NULL,
    reference_no character varying(60) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    vendor_code character varying(100) NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    action_type character varying(60) DEFAULT NULL::character varying,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
 !   DROP TABLE public.hr_compliance;
       public         heap    postgres    false            �            1259    50164    hr_compliance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hr_compliance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.hr_compliance_id_seq;
       public          postgres    false    239            �           0    0    hr_compliance_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.hr_compliance_id_seq OWNED BY public.hr_compliance.id;
          public          postgres    false    240            �            1259    50165 	   hr_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE public.hr_id_seq;
       public          postgres    false    238            �           0    0 	   hr_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE public.hr_id_seq OWNED BY public.hr.id;
          public          postgres    false    241            �            1259    50166    icgrn    TABLE     P  CREATE TABLE public.icgrn (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    vendor_code character varying(100) NOT NULL,
    document_type character varying(40) NOT NULL,
    file_name character varying(300) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_name character varying(255) NOT NULL,
    created_by_id character varying(200) NOT NULL
);
    DROP TABLE public.icgrn;
       public         heap    postgres    false            �            1259    50173    icgrn_id_seq    SEQUENCE     �   CREATE SEQUENCE public.icgrn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.icgrn_id_seq;
       public          postgres    false    242            �           0    0    icgrn_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.icgrn_id_seq OWNED BY public.icgrn.id;
          public          postgres    false    243            �            1259    50174    ilms    TABLE     r  CREATE TABLE public.ilms (
    id integer NOT NULL,
    reference_no character varying(60) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    vendor_code character varying(100) DEFAULT NULL::character varying,
    type character varying(100) DEFAULT NULL::character varying,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL,
    updated_by character varying(255) NOT NULL
);
    DROP TABLE public.ilms;
       public         heap    postgres    false            �            1259    50183    ilms_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ilms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.ilms_id_seq;
       public          postgres    false    244            �           0    0    ilms_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.ilms_id_seq OWNED BY public.ilms.id;
          public          postgres    false    245            �            1259    50184    inspection_call_letter    TABLE       CREATE TABLE public.inspection_call_letter (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    action_type character varying(60) DEFAULT NULL::character varying,
    vendor_code character varying(100) NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
 *   DROP TABLE public.inspection_call_letter;
       public         heap    postgres    false            �            1259    50192    inspection_call_letter_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inspection_call_letter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.inspection_call_letter_id_seq;
       public          postgres    false    246            �           0    0    inspection_call_letter_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.inspection_call_letter_id_seq OWNED BY public.inspection_call_letter.id;
          public          postgres    false    247            �            1259    50193    inspection_release_note    TABLE        CREATE TABLE public.inspection_release_note (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    action_type character varying(60) NOT NULL,
    vendor_code character varying(100) NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
 +   DROP TABLE public.inspection_release_note;
       public         heap    postgres    false            �            1259    50200    inspection_release_note_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inspection_release_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.inspection_release_note_id_seq;
       public          postgres    false    248            �           0    0    inspection_release_note_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.inspection_release_note_id_seq OWNED BY public.inspection_release_note.id;
          public          postgres    false    249            �            1259    50201    internal_role_master    TABLE     o   CREATE TABLE public.internal_role_master (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);
 (   DROP TABLE public.internal_role_master;
       public         heap    postgres    false            �            1259    50204    internal_role_master_id_seq    SEQUENCE     �   CREATE SEQUENCE public.internal_role_master_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.internal_role_master_id_seq;
       public          postgres    false    250            �           0    0    internal_role_master_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.internal_role_master_id_seq OWNED BY public.internal_role_master.id;
          public          postgres    false    251            �            1259    50205    lfa1    TABLE       CREATE TABLE public.lfa1 (
    lifnr character varying(10) NOT NULL,
    land1 character varying(3) DEFAULT NULL::character varying,
    name1 character varying(35) DEFAULT NULL::character varying,
    ort01 character varying(35) DEFAULT NULL::character varying,
    ort02 character varying(35) DEFAULT NULL::character varying,
    pfach character varying(10) DEFAULT NULL::character varying,
    stcd1 character varying(16) DEFAULT NULL::character varying,
    stcd3 character varying(18) DEFAULT NULL::character varying,
    email character varying(241) DEFAULT NULL::character varying,
    phone character varying(13) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint,
    telf2 character varying(16) DEFAULT NULL::character varying
);
    DROP TABLE public.lfa1;
       public         heap    postgres    false            �           0    0    COLUMN lfa1.lifnr    COMMENT     O   COMMENT ON COLUMN public.lfa1.lifnr IS 'Account Number of Vendor or Creditor';
          public          postgres    false    252            �           0    0    COLUMN lfa1.land1    COMMENT     6   COMMENT ON COLUMN public.lfa1.land1 IS 'Country Key';
          public          postgres    false    252            �           0    0    COLUMN lfa1.name1    COMMENT     1   COMMENT ON COLUMN public.lfa1.name1 IS 'Name 1';
          public          postgres    false    252            �           0    0    COLUMN lfa1.ort01    COMMENT     /   COMMENT ON COLUMN public.lfa1.ort01 IS 'City';
          public          postgres    false    252            �           0    0    COLUMN lfa1.ort02    COMMENT     3   COMMENT ON COLUMN public.lfa1.ort02 IS 'District';
          public          postgres    false    252            �           0    0    COLUMN lfa1.pfach    COMMENT     1   COMMENT ON COLUMN public.lfa1.pfach IS 'PO Box';
          public          postgres    false    252            �           0    0    COLUMN lfa1.stcd1    COMMENT     7   COMMENT ON COLUMN public.lfa1.stcd1 IS 'Tax Number 1';
          public          postgres    false    252            �           0    0    COLUMN lfa1.stcd3    COMMENT     7   COMMENT ON COLUMN public.lfa1.stcd3 IS 'Tax Number 3';
          public          postgres    false    252            �           0    0    COLUMN lfa1.email    COMMENT     8   COMMENT ON COLUMN public.lfa1.email IS 'Email Address';
          public          postgres    false    252            �           0    0    COLUMN lfa1.phone    COMMENT     7   COMMENT ON COLUMN public.lfa1.phone IS 'Phone Number';
          public          postgres    false    252            �           0    0    COLUMN lfa1.created_at    COMMENT     <   COMMENT ON COLUMN public.lfa1.created_at IS 'Created time';
          public          postgres    false    252            �           0    0    COLUMN lfa1.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.lfa1.last_changed_at IS 'Last change time';
          public          postgres    false    252            �            1259    50217    makt    TABLE       CREATE TABLE public.makt (
    matnr character(18) NOT NULL,
    spras character varying(1) DEFAULT NULL::character varying,
    maktx character(40) DEFAULT NULL::bpchar,
    maktg character(40) DEFAULT NULL::bpchar,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.makt;
       public         heap    postgres    false            �           0    0    COLUMN makt.matnr    COMMENT     :   COMMENT ON COLUMN public.makt.matnr IS 'Material Number';
          public          postgres    false    253            �           0    0    COLUMN makt.spras    COMMENT     7   COMMENT ON COLUMN public.makt.spras IS 'Language Key';
          public          postgres    false    253            �           0    0    COLUMN makt.maktx    COMMENT     L   COMMENT ON COLUMN public.makt.maktx IS 'Material Description (Short Text)';
          public          postgres    false    253            �           0    0    COLUMN makt.maktg    COMMENT     \   COMMENT ON COLUMN public.makt.maktg IS 'Material description in upper case for matchcodes';
          public          postgres    false    253            �           0    0    COLUMN makt.created_at    COMMENT     <   COMMENT ON COLUMN public.makt.created_at IS 'Created time';
          public          postgres    false    253            �           0    0    COLUMN makt.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.makt.last_changed_at IS 'Last change time';
          public          postgres    false    253            �            1259    50223    mara    TABLE     �   CREATE TABLE public.mara (
    matnr character varying(18) NOT NULL,
    mtart character varying(4) DEFAULT NULL::character varying
);
    DROP TABLE public.mara;
       public         heap    postgres    false            �           0    0    COLUMN mara.matnr    COMMENT     :   COMMENT ON COLUMN public.mara.matnr IS 'Material Number';
          public          postgres    false    254            �           0    0    COLUMN mara.mtart    COMMENT     8   COMMENT ON COLUMN public.mara.mtart IS 'Material Type';
          public          postgres    false    254            �            1259    50227    material_type    TABLE     �   CREATE TABLE public.material_type (
    id integer NOT NULL,
    material_type character varying(20) NOT NULL,
    material_type_value character varying(30) NOT NULL
);
 !   DROP TABLE public.material_type;
       public         heap    postgres    false                        1259    50230    material_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.material_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.material_type_id_seq;
       public          postgres    false    255            �           0    0    material_type_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.material_type_id_seq OWNED BY public.material_type.id;
          public          postgres    false    256                       1259    50231    mkpf    TABLE     Z  CREATE TABLE public.mkpf (
    mblnr character varying(10) NOT NULL,
    mjahr integer NOT NULL,
    vgart character varying(2) DEFAULT NULL::character varying,
    blart character varying(2) DEFAULT NULL::character varying,
    blaum character varying(2) DEFAULT NULL::character varying,
    bldat date,
    budat date,
    cpudt date,
    cputm time without time zone,
    aedat date,
    usnam character varying(12) DEFAULT NULL::character varying,
    tcode character varying(4) DEFAULT NULL::character varying,
    xblnr character varying(16) DEFAULT NULL::character varying,
    bktxt character varying(25) DEFAULT NULL::character varying,
    frath character varying(13) DEFAULT NULL::character varying,
    frbnr character varying(16) DEFAULT NULL::character varying,
    wever character varying(1) DEFAULT NULL::character varying,
    xabln character varying(10) DEFAULT NULL::character varying,
    awsys character varying(10) DEFAULT NULL::character varying,
    bla2d character varying(2) DEFAULT NULL::character varying,
    tcode2 character varying(20) DEFAULT NULL::character varying,
    bfwms character varying(1) DEFAULT NULL::character varying,
    exnum character varying(10) DEFAULT NULL::character varying,
    spe_budat_uhr time without time zone,
    spe_budat_zone character varying(6) DEFAULT NULL::character varying,
    le_vbeln character varying(10) DEFAULT NULL::character varying,
    spe_logsys character varying(10) DEFAULT NULL::character varying,
    spe_mdnum_ewm character varying(16) DEFAULT NULL::character varying,
    gts_cusref_no character varying(35) DEFAULT NULL::character varying,
    fls_rsto character varying(1) DEFAULT NULL::character varying,
    msr_active character varying(1) DEFAULT NULL::character varying,
    knumv character varying(10) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.mkpf;
       public         heap    postgres    false            �           0    0    COLUMN mkpf.mblnr    COMMENT     F   COMMENT ON COLUMN public.mkpf.mblnr IS 'Number of Material Document';
          public          postgres    false    257            �           0    0    COLUMN mkpf.mjahr    COMMENT     A   COMMENT ON COLUMN public.mkpf.mjahr IS 'Material Document Year';
          public          postgres    false    257            �           0    0    COLUMN mkpf.vgart    COMMENT     A   COMMENT ON COLUMN public.mkpf.vgart IS 'Transaction/Event Type';
          public          postgres    false    257            �           0    0    COLUMN mkpf.blart    COMMENT     8   COMMENT ON COLUMN public.mkpf.blart IS 'Document Type';
          public          postgres    false    257            �           0    0    COLUMN mkpf.blaum    COMMENT     P   COMMENT ON COLUMN public.mkpf.blaum IS 'Document type of revaluation document';
          public          postgres    false    257            �           0    0    COLUMN mkpf.bldat    COMMENT     D   COMMENT ON COLUMN public.mkpf.bldat IS 'Document Date in Document';
          public          postgres    false    257            �           0    0    COLUMN mkpf.budat    COMMENT     G   COMMENT ON COLUMN public.mkpf.budat IS 'Posting Date in the Document';
          public          postgres    false    257            �           0    0    COLUMN mkpf.cpudt    COMMENT     W   COMMENT ON COLUMN public.mkpf.cpudt IS 'Day On Which Accounting Document Was Entered';
          public          postgres    false    257            �           0    0    COLUMN mkpf.cputm    COMMENT     8   COMMENT ON COLUMN public.mkpf.cputm IS 'Time of Entry';
          public          postgres    false    257            �           0    0    COLUMN mkpf.aedat    COMMENT     :   COMMENT ON COLUMN public.mkpf.aedat IS 'Last Changed On';
          public          postgres    false    257            �           0    0    COLUMN mkpf.usnam    COMMENT     4   COMMENT ON COLUMN public.mkpf.usnam IS 'User Name';
          public          postgres    false    257            �           0    0    COLUMN mkpf.tcode    COMMENT     g   COMMENT ON COLUMN public.mkpf.tcode IS 'Not More Closely Defined Area, Possibly Used for Patchlevels';
          public          postgres    false    257            �           0    0    COLUMN mkpf.xblnr    COMMENT     D   COMMENT ON COLUMN public.mkpf.xblnr IS 'Reference Document Number';
          public          postgres    false    257            �           0    0    COLUMN mkpf.bktxt    COMMENT     ?   COMMENT ON COLUMN public.mkpf.bktxt IS 'Document Header Text';
          public          postgres    false    257            �           0    0    COLUMN mkpf.frath    COMMENT     C   COMMENT ON COLUMN public.mkpf.frath IS 'Unplanned delivery costs';
          public          postgres    false    257            �           0    0    COLUMN mkpf.frbnr    COMMENT     \   COMMENT ON COLUMN public.mkpf.frbnr IS 'Number of Bill of Lading at Time of Goods Receipt';
          public          postgres    false    257            �           0    0    COLUMN mkpf.wever    COMMENT     J   COMMENT ON COLUMN public.mkpf.wever IS 'Version for Printing GR/GI Slip';
          public          postgres    false    257            �           0    0    COLUMN mkpf.xabln    COMMENT     J   COMMENT ON COLUMN public.mkpf.xabln IS 'Goods Receipt/Issue Slip Number';
          public          postgres    false    257            �           0    0    COLUMN mkpf.awsys    COMMENT     9   COMMENT ON COLUMN public.mkpf.awsys IS 'Logical System';
          public          postgres    false    257            �           0    0    COLUMN mkpf.bla2d    COMMENT     g   COMMENT ON COLUMN public.mkpf.bla2d IS 'Doc. type for additional doc. in purchase account management';
          public          postgres    false    257            �           0    0    COLUMN mkpf.tcode2    COMMENT     <   COMMENT ON COLUMN public.mkpf.tcode2 IS 'Transaction Code';
          public          postgres    false    257            �           0    0    COLUMN mkpf.bfwms    COMMENT     K   COMMENT ON COLUMN public.mkpf.bfwms IS 'Control posting for external WMS';
          public          postgres    false    257            �           0    0    COLUMN mkpf.exnum    COMMENT     ^   COMMENT ON COLUMN public.mkpf.exnum IS 'Number of foreign trade data in MM and SD documents';
          public          postgres    false    257            �           0    0    COLUMN mkpf.spe_budat_uhr    COMMENT     c   COMMENT ON COLUMN public.mkpf.spe_budat_uhr IS 'Time of Goods Issue (Local, Relating to a Plant)';
          public          postgres    false    257            �           0    0    COLUMN mkpf.spe_budat_zone    COMMENT     =   COMMENT ON COLUMN public.mkpf.spe_budat_zone IS 'Time Zone';
          public          postgres    false    257            �           0    0    COLUMN mkpf.le_vbeln    COMMENT     6   COMMENT ON COLUMN public.mkpf.le_vbeln IS 'Delivery';
          public          postgres    false    257            �           0    0    COLUMN mkpf.spe_logsys    COMMENT     W   COMMENT ON COLUMN public.mkpf.spe_logsys IS 'Logical System of EWM Material Document';
          public          postgres    false    257            �           0    0    COLUMN mkpf.spe_mdnum_ewm    COMMENT     U   COMMENT ON COLUMN public.mkpf.spe_mdnum_ewm IS 'Number of Material Document in EWM';
          public          postgres    false    257            �           0    0    COLUMN mkpf.gts_cusref_no    COMMENT     Y   COMMENT ON COLUMN public.mkpf.gts_cusref_no IS 'Customs Reference Number for Scrapping';
          public          postgres    false    257            �           0    0    COLUMN mkpf.fls_rsto    COMMENT     ]   COMMENT ON COLUMN public.mkpf.fls_rsto IS 'Store Return with Inbound and Outbound Delivery';
          public          postgres    false    257            �           0    0    COLUMN mkpf.msr_active    COMMENT     R   COMMENT ON COLUMN public.mkpf.msr_active IS 'Advanced Returns Management Active';
          public          postgres    false    257            �           0    0    COLUMN mkpf.knumv    COMMENT     K   COMMENT ON COLUMN public.mkpf.knumv IS 'Number of the document condition';
          public          postgres    false    257            �           0    0    COLUMN mkpf.created_at    COMMENT     <   COMMENT ON COLUMN public.mkpf.created_at IS 'Created time';
          public          postgres    false    257            �           0    0    COLUMN mkpf.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.mkpf.last_changed_at IS 'Last change time';
          public          postgres    false    257                       1259    50258    mrs    TABLE       CREATE TABLE public.mrs (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) DEFAULT NULL::character varying,
    document_type character varying(40) DEFAULT NULL::character varying,
    file_name character varying(300) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
    DROP TABLE public.mrs;
       public         heap    postgres    false                       1259    50267 
   mrs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mrs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.mrs_id_seq;
       public          postgres    false    258            �           0    0 
   mrs_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.mrs_id_seq OWNED BY public.mrs.id;
          public          postgres    false    259                       1259    50268    mseg    TABLE     �  CREATE TABLE public.mseg (
    mblnr character varying(10) NOT NULL,
    mjahr integer NOT NULL,
    zeile integer NOT NULL,
    line_id integer,
    parent_id integer,
    line_depth integer,
    maa_urzei integer,
    bwart character varying(3) DEFAULT NULL::character varying,
    xauto character varying(1) DEFAULT NULL::character varying,
    matnr character varying(18) DEFAULT NULL::character varying,
    werks character varying(4) DEFAULT NULL::character varying,
    lgort character varying(4) DEFAULT NULL::character varying,
    charg character varying(10) DEFAULT NULL::character varying,
    insmk character varying(1) DEFAULT NULL::character varying,
    sobkz character varying(1) DEFAULT NULL::character varying,
    lifnr character varying(10) DEFAULT NULL::character varying,
    kunnr character varying(10) DEFAULT NULL::character varying,
    bwtar character varying(10) DEFAULT NULL::character varying,
    menge bigint,
    meins character varying(3) DEFAULT NULL::character varying,
    erfmg bigint,
    erfme character varying(3) DEFAULT NULL::character varying,
    bpmng bigint,
    bprme character varying(3) DEFAULT NULL::character varying,
    ebeln character varying(10) DEFAULT NULL::character varying,
    ebelp integer,
    lfbja integer,
    lfbnr character varying(10) DEFAULT NULL::character varying,
    lfpos integer,
    sjahr integer,
    smbln character varying(10) DEFAULT NULL::character varying,
    smblp integer,
    elikz character varying(1) DEFAULT NULL::character varying,
    sgtxt character varying(50) DEFAULT NULL::character varying,
    equnr character varying(18) DEFAULT NULL::character varying,
    wempf character varying(12) DEFAULT NULL::character varying,
    ablad character varying(25) DEFAULT NULL::character varying,
    gsber character varying(4) DEFAULT NULL::character varying,
    kokrs character varying(4) DEFAULT NULL::character varying,
    kostl character varying(10) DEFAULT NULL::character varying,
    aufnr character varying(12) DEFAULT NULL::character varying,
    gjahr integer,
    bukrs character varying(4) DEFAULT NULL::character varying,
    buzum integer,
    rsnum integer,
    rspos integer,
    kzstr character varying(1) DEFAULT NULL::character varying,
    kzbew character varying(1) DEFAULT NULL::character varying,
    kzvbr character varying(1) DEFAULT NULL::character varying,
    prctr character varying(10) DEFAULT NULL::character varying,
    ps_psp_pnr integer,
    sakto character varying(10) DEFAULT NULL::character varying,
    bstmg bigint,
    emlif character varying(10) DEFAULT NULL::character varying,
    pprctr character varying(10) DEFAULT NULL::character varying,
    matbf character varying(18) DEFAULT NULL::character varying,
    bustm character varying(4) DEFAULT NULL::character varying,
    bustw character varying(4) DEFAULT NULL::character varying,
    mengu character varying(1) DEFAULT NULL::character varying,
    wertu character varying(1) DEFAULT NULL::character varying,
    lbkum bigint,
    salk3 character varying(13) DEFAULT NULL::character varying,
    vprsv character varying(1) DEFAULT NULL::character varying,
    kzbws character varying(1) DEFAULT NULL::character varying,
    qinspst character varying(1) DEFAULT NULL::character varying,
    urzei integer,
    j_1bexbase character varying(13) DEFAULT NULL::character varying,
    mwskz character varying(2) DEFAULT NULL::character varying,
    txjcd character varying(15) DEFAULT NULL::character varying,
    ematn character varying(18) DEFAULT NULL::character varying,
    mat_pspnr integer,
    bemot character varying(2) DEFAULT NULL::character varying,
    zustd_t156m character varying(1) DEFAULT NULL::character varying,
    spe_gts_stock_ty character varying(1) DEFAULT NULL::character varying,
    budat_mkpf date,
    cputm_mkpf time without time zone,
    usnam_mkpf character varying(12) DEFAULT NULL::character varying,
    xblnr_mkpf character varying(16) DEFAULT NULL::character varying,
    tcode2_mkpf character varying(20) DEFAULT NULL::character varying,
    sgt_scat character varying(16) DEFAULT NULL::character varying,
    sgt_umscat character varying(16) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.mseg;
       public         heap    postgres    false            �           0    0    COLUMN mseg.mblnr    COMMENT     F   COMMENT ON COLUMN public.mseg.mblnr IS 'Number of Material Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.mjahr    COMMENT     A   COMMENT ON COLUMN public.mseg.mjahr IS 'Material Document Year';
          public          postgres    false    260            �           0    0    COLUMN mseg.zeile    COMMENT     D   COMMENT ON COLUMN public.mseg.zeile IS 'Item in Material Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.line_id    COMMENT     S   COMMENT ON COLUMN public.mseg.line_id IS 'Unique identification of document line';
          public          postgres    false    260            �           0    0    COLUMN mseg.parent_id    COMMENT     V   COMMENT ON COLUMN public.mseg.parent_id IS 'Identifier of immediately superior line';
          public          postgres    false    260            �           0    0    COLUMN mseg.line_depth    COMMENT     S   COMMENT ON COLUMN public.mseg.line_depth IS 'Hierarchy level of line in document';
          public          postgres    false    260            �           0    0    COLUMN mseg.maa_urzei    COMMENT     i   COMMENT ON COLUMN public.mseg.maa_urzei IS 'Original Line for Account Assignment Item in Material Doc.';
          public          postgres    false    260            �           0    0    COLUMN mseg.bwart    COMMENT     O   COMMENT ON COLUMN public.mseg.bwart IS 'Movement Type (Inventory Management)';
          public          postgres    false    260            �           0    0    COLUMN mseg.xauto    COMMENT     E   COMMENT ON COLUMN public.mseg.xauto IS 'Item automatically created';
          public          postgres    false    260            �           0    0    COLUMN mseg.matnr    COMMENT     :   COMMENT ON COLUMN public.mseg.matnr IS 'Material Number';
          public          postgres    false    260            �           0    0    COLUMN mseg.werks    COMMENT     0   COMMENT ON COLUMN public.mseg.werks IS 'Plant';
          public          postgres    false    260            �           0    0    COLUMN mseg.lgort    COMMENT     ;   COMMENT ON COLUMN public.mseg.lgort IS 'Storage Location';
          public          postgres    false    260            �           0    0    COLUMN mseg.charg    COMMENT     7   COMMENT ON COLUMN public.mseg.charg IS 'Batch Number';
          public          postgres    false    260            �           0    0    COLUMN mseg.insmk    COMMENT     5   COMMENT ON COLUMN public.mseg.insmk IS 'Stock Type';
          public          postgres    false    260            �           0    0    COLUMN mseg.sobkz    COMMENT     B   COMMENT ON COLUMN public.mseg.sobkz IS 'Special Stock Indicator';
          public          postgres    false    260            �           0    0    COLUMN mseg.lifnr    COMMENT     E   COMMENT ON COLUMN public.mseg.lifnr IS 'Supplier''s Account Number';
          public          postgres    false    260            �           0    0    COLUMN mseg.kunnr    COMMENT     E   COMMENT ON COLUMN public.mseg.kunnr IS 'Account number of customer';
          public          postgres    false    260            �           0    0    COLUMN mseg.bwtar    COMMENT     9   COMMENT ON COLUMN public.mseg.bwtar IS 'Valuation Type';
          public          postgres    false    260            �           0    0    COLUMN mseg.menge    COMMENT     3   COMMENT ON COLUMN public.mseg.menge IS 'Quantity';
          public          postgres    false    260            �           0    0    COLUMN mseg.meins    COMMENT     ?   COMMENT ON COLUMN public.mseg.meins IS 'Base Unit of Measure';
          public          postgres    false    260            �           0    0    COLUMN mseg.erfmg    COMMENT     D   COMMENT ON COLUMN public.mseg.erfmg IS 'Quantity in unit of entry';
          public          postgres    false    260            �           0    0    COLUMN mseg.erfme    COMMENT     8   COMMENT ON COLUMN public.mseg.erfme IS 'Unit of entry';
          public          postgres    false    260            �           0    0    COLUMN mseg.bpmng    COMMENT     P   COMMENT ON COLUMN public.mseg.bpmng IS 'Quantity in Purchase Order Price Unit';
          public          postgres    false    260            �           0    0    COLUMN mseg.bprme    COMMENT     H   COMMENT ON COLUMN public.mseg.bprme IS 'Order Price Unit (Purchasing)';
          public          postgres    false    260            �           0    0    COLUMN mseg.ebeln    COMMENT     @   COMMENT ON COLUMN public.mseg.ebeln IS 'Purchase order number';
          public          postgres    false    260            �           0    0    COLUMN mseg.ebelp    COMMENT     M   COMMENT ON COLUMN public.mseg.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.lfbja    COMMENT     N   COMMENT ON COLUMN public.mseg.lfbja IS 'Fiscal Year of a Reference Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.lfbnr    COMMENT     O   COMMENT ON COLUMN public.mseg.lfbnr IS 'Document No. of a Reference Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.lfpos    COMMENT     G   COMMENT ON COLUMN public.mseg.lfpos IS 'Item of a Reference Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.sjahr    COMMENT     A   COMMENT ON COLUMN public.mseg.sjahr IS 'Material Document Year';
          public          postgres    false    260            �           0    0    COLUMN mseg.smbln    COMMENT     F   COMMENT ON COLUMN public.mseg.smbln IS 'Number of Material Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.smblp    COMMENT     D   COMMENT ON COLUMN public.mseg.smblp IS 'Item in Material Document';
          public          postgres    false    260            �           0    0    COLUMN mseg.elikz    COMMENT     G   COMMENT ON COLUMN public.mseg.elikz IS 'Delivery Completed Indicator';
          public          postgres    false    260            �           0    0    COLUMN mseg.sgtxt    COMMENT     4   COMMENT ON COLUMN public.mseg.sgtxt IS 'Item Text';
          public          postgres    false    260            �           0    0    COLUMN mseg.equnr    COMMENT     ;   COMMENT ON COLUMN public.mseg.equnr IS 'Equipment Number';
          public          postgres    false    260            �           0    0    COLUMN mseg.wempf    COMMENT     :   COMMENT ON COLUMN public.mseg.wempf IS 'Goods recipient';
          public          postgres    false    260            �           0    0    COLUMN mseg.ablad    COMMENT     :   COMMENT ON COLUMN public.mseg.ablad IS 'Unloading Point';
          public          postgres    false    260            �           0    0    COLUMN mseg.gsber    COMMENT     8   COMMENT ON COLUMN public.mseg.gsber IS 'Business Area';
          public          postgres    false    260            �           0    0    COLUMN mseg.kokrs    COMMENT     ;   COMMENT ON COLUMN public.mseg.kokrs IS 'Controlling Area';
          public          postgres    false    260            �           0    0    COLUMN mseg.kostl    COMMENT     6   COMMENT ON COLUMN public.mseg.kostl IS 'Cost Center';
          public          postgres    false    260            �           0    0    COLUMN mseg.aufnr    COMMENT     7   COMMENT ON COLUMN public.mseg.aufnr IS 'Order Number';
          public          postgres    false    260            �           0    0    COLUMN mseg.gjahr    COMMENT     6   COMMENT ON COLUMN public.mseg.gjahr IS 'Fiscal Year';
          public          postgres    false    260            �           0    0    COLUMN mseg.bukrs    COMMENT     7   COMMENT ON COLUMN public.mseg.bukrs IS 'Company Code';
          public          postgres    false    260                        0    0    COLUMN mseg.buzum    COMMENT     Y   COMMENT ON COLUMN public.mseg.buzum IS 'Number of Line Item Within Accounting Document';
          public          postgres    false    260                       0    0    COLUMN mseg.rsnum    COMMENT     W   COMMENT ON COLUMN public.mseg.rsnum IS 'Number of reservation/dependent requirements';
          public          postgres    false    260                       0    0    COLUMN mseg.rspos    COMMENT     ^   COMMENT ON COLUMN public.mseg.rspos IS 'Item Number of Reservation / Dependent Requirements';
          public          postgres    false    260                       0    0    COLUMN mseg.kzstr    COMMENT     V   COMMENT ON COLUMN public.mseg.kzstr IS 'Transaction/event is relevant to statistics';
          public          postgres    false    260                       0    0    COLUMN mseg.kzbew    COMMENT     =   COMMENT ON COLUMN public.mseg.kzbew IS 'Movement Indicator';
          public          postgres    false    260                       0    0    COLUMN mseg.kzvbr    COMMENT     >   COMMENT ON COLUMN public.mseg.kzvbr IS 'Consumption posting';
          public          postgres    false    260                       0    0    COLUMN mseg.prctr    COMMENT     8   COMMENT ON COLUMN public.mseg.prctr IS 'Profit Center';
          public          postgres    false    260                       0    0    COLUMN mseg.ps_psp_pnr    COMMENT     ^   COMMENT ON COLUMN public.mseg.ps_psp_pnr IS 'Work Breakdown Structure Element (WBS Element)';
          public          postgres    false    260                       0    0    COLUMN mseg.sakto    COMMENT     =   COMMENT ON COLUMN public.mseg.sakto IS 'G/L Account Number';
          public          postgres    false    260            	           0    0    COLUMN mseg.bstmg    COMMENT     O   COMMENT ON COLUMN public.mseg.bstmg IS 'Goods receipt quantity in order unit';
          public          postgres    false    260            
           0    0    COLUMN mseg.emlif    COMMENT     [   COMMENT ON COLUMN public.mseg.emlif IS 'Vendor to be supplied/who is to receive delivery';
          public          postgres    false    260                       0    0    COLUMN mseg.pprctr    COMMENT     A   COMMENT ON COLUMN public.mseg.pprctr IS 'Partner Profit Center';
          public          postgres    false    260                       0    0    COLUMN mseg.matbf    COMMENT     X   COMMENT ON COLUMN public.mseg.matbf IS 'Material in Respect of Which Stock is Managed';
          public          postgres    false    260                       0    0    COLUMN mseg.bustm    COMMENT     H   COMMENT ON COLUMN public.mseg.bustm IS 'Posting string for quantities';
          public          postgres    false    260                       0    0    COLUMN mseg.bustw    COMMENT     D   COMMENT ON COLUMN public.mseg.bustw IS 'Posting String for Values';
          public          postgres    false    260                       0    0    COLUMN mseg.mengu    COMMENT     V   COMMENT ON COLUMN public.mseg.mengu IS 'Quantity Updating in Material Master Record';
          public          postgres    false    260                       0    0    COLUMN mseg.wertu    COMMENT     S   COMMENT ON COLUMN public.mseg.wertu IS 'Value Updating in Material Master Record';
          public          postgres    false    260                       0    0    COLUMN mseg.lbkum    COMMENT     R   COMMENT ON COLUMN public.mseg.lbkum IS 'Total valuated stock before the posting';
          public          postgres    false    260                       0    0    COLUMN mseg.salk3    COMMENT     [   COMMENT ON COLUMN public.mseg.salk3 IS 'Value of total valuated stock before the posting';
          public          postgres    false    260                       0    0    COLUMN mseg.vprsv    COMMENT     B   COMMENT ON COLUMN public.mseg.vprsv IS 'Price control indicator';
          public          postgres    false    260                       0    0    COLUMN mseg.kzbws    COMMENT     E   COMMENT ON COLUMN public.mseg.kzbws IS 'Valuation of Special Stock';
          public          postgres    false    260                       0    0    COLUMN mseg.qinspst    COMMENT     O   COMMENT ON COLUMN public.mseg.qinspst IS 'Status of Goods Receipt Inspection';
          public          postgres    false    260                       0    0    COLUMN mseg.urzei    COMMENT     M   COMMENT ON COLUMN public.mseg.urzei IS 'Original line in material document';
          public          postgres    false    260                       0    0    COLUMN mseg.j_1bexbase    COMMENT     Z   COMMENT ON COLUMN public.mseg.j_1bexbase IS 'Alternate base amount in document currency';
          public          postgres    false    260                       0    0    COLUMN mseg.mwskz    COMMENT     F   COMMENT ON COLUMN public.mseg.mwskz IS 'Tax on Sales/Purchases Code';
          public          postgres    false    260                       0    0    COLUMN mseg.txjcd    COMMENT     ;   COMMENT ON COLUMN public.mseg.txjcd IS 'Tax Jurisdiction';
          public          postgres    false    260                       0    0    COLUMN mseg.ematn    COMMENT     d   COMMENT ON COLUMN public.mseg.ematn IS 'Material number corresponding to manufacturer part number';
          public          postgres    false    260                       0    0    COLUMN mseg.mat_pspnr    COMMENT     U   COMMENT ON COLUMN public.mseg.mat_pspnr IS 'Valuated Sales Order Stock WBS Element';
          public          postgres    false    260                       0    0    COLUMN mseg.bemot    COMMENT     ?   COMMENT ON COLUMN public.mseg.bemot IS 'Accounting Indicator';
          public          postgres    false    260                       0    0    COLUMN mseg.zustd_t156m    COMMENT     `   COMMENT ON COLUMN public.mseg.zustd_t156m IS 'Stock Type Modification (Read from Table T156M)';
          public          postgres    false    260                       0    0    COLUMN mseg.spe_gts_stock_ty    COMMENT     D   COMMENT ON COLUMN public.mseg.spe_gts_stock_ty IS 'GTS Stock Type';
          public          postgres    false    260                       0    0    COLUMN mseg.budat_mkpf    COMMENT     L   COMMENT ON COLUMN public.mseg.budat_mkpf IS 'Posting Date in the Document';
          public          postgres    false    260                        0    0    COLUMN mseg.cputm_mkpf    COMMENT     =   COMMENT ON COLUMN public.mseg.cputm_mkpf IS 'Time of Entry';
          public          postgres    false    260            !           0    0    COLUMN mseg.usnam_mkpf    COMMENT     9   COMMENT ON COLUMN public.mseg.usnam_mkpf IS 'User Name';
          public          postgres    false    260            "           0    0    COLUMN mseg.xblnr_mkpf    COMMENT     I   COMMENT ON COLUMN public.mseg.xblnr_mkpf IS 'Reference Document Number';
          public          postgres    false    260            #           0    0    COLUMN mseg.tcode2_mkpf    COMMENT     A   COMMENT ON COLUMN public.mseg.tcode2_mkpf IS 'Transaction Code';
          public          postgres    false    260            $           0    0    COLUMN mseg.sgt_scat    COMMENT     ;   COMMENT ON COLUMN public.mseg.sgt_scat IS 'Stock Segment';
          public          postgres    false    260            %           0    0    COLUMN mseg.sgt_umscat    COMMENT     O   COMMENT ON COLUMN public.mseg.sgt_umscat IS 'Receiving/Issuing Stock Segment';
          public          postgres    false    260            &           0    0    COLUMN mseg.created_at    COMMENT     <   COMMENT ON COLUMN public.mseg.created_at IS 'Created time';
          public          postgres    false    260            '           0    0    COLUMN mseg.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.mseg.last_changed_at IS 'Last change time';
          public          postgres    false    260                       1259    50328    pa0002    TABLE     @  CREATE TABLE public.pa0002 (
    pernr integer NOT NULL,
    cname character varying(80) DEFAULT NULL::character varying,
    email character varying(240) DEFAULT NULL::character varying,
    phone character varying(240) DEFAULT NULL::character varying,
    persg character varying(2) DEFAULT NULL::character varying
);
    DROP TABLE public.pa0002;
       public         heap    postgres    false            (           0    0    COLUMN pa0002.pernr    COMMENT     =   COMMENT ON COLUMN public.pa0002.pernr IS 'Personnel Number';
          public          postgres    false    261            )           0    0    COLUMN pa0002.cname    COMMENT     :   COMMENT ON COLUMN public.pa0002.cname IS 'Complete Name';
          public          postgres    false    261            *           0    0    COLUMN pa0002.email    COMMENT     3   COMMENT ON COLUMN public.pa0002.email IS 'E Mail';
          public          postgres    false    261            +           0    0    COLUMN pa0002.phone    COMMENT     9   COMMENT ON COLUMN public.pa0002.phone IS 'Phone Number';
          public          postgres    false    261            ,           0    0    COLUMN pa0002.persg    COMMENT     7   COMMENT ON COLUMN public.pa0002.persg IS 'User Group';
          public          postgres    false    261                       1259    50337    ppc_wbs_project_code    TABLE     
  CREATE TABLE public.ppc_wbs_project_code (
    id integer NOT NULL,
    user_id character varying(100) NOT NULL,
    purchasing_doc_no character varying(12) NOT NULL,
    wbs_element character varying(60) NOT NULL,
    project_code character varying(60) NOT NULL
);
 (   DROP TABLE public.ppc_wbs_project_code;
       public         heap    postgres    false                       1259    50340    ppc_wbs_project_code_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ppc_wbs_project_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.ppc_wbs_project_code_id_seq;
       public          postgres    false    262            -           0    0    ppc_wbs_project_code_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.ppc_wbs_project_code_id_seq OWNED BY public.ppc_wbs_project_code.id;
          public          postgres    false    263                       1259    50341 	   privilege    TABLE     �  CREATE TABLE public.privilege (
    id integer NOT NULL,
    department_id integer NOT NULL,
    internal_role_id integer NOT NULL,
    sdbg character varying(2) NOT NULL,
    drawing character varying(2) NOT NULL,
    qap character varying(2) NOT NULL,
    inspectioncallletter character varying(2) NOT NULL,
    shippingdocuments character varying(2) NOT NULL,
    gateentry character varying(2) NOT NULL,
    grn character varying(2) NOT NULL,
    icgrn character varying(2) NOT NULL,
    wdc character varying(2) NOT NULL,
    bpgcopy character varying(2) NOT NULL,
    checklist character varying(2) NOT NULL,
    billregistration character varying(2) NOT NULL,
    paymentvoucher character varying(2) NOT NULL
);
    DROP TABLE public.privilege;
       public         heap    postgres    false            	           1259    50344    privilege_id_seq    SEQUENCE     �   CREATE SEQUENCE public.privilege_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.privilege_id_seq;
       public          postgres    false    264            .           0    0    privilege_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.privilege_id_seq OWNED BY public.privilege.id;
          public          postgres    false    265            
           1259    50345    qals    TABLE     �  CREATE TABLE public.qals (
    prueflos bigint NOT NULL,
    werk character varying(4) DEFAULT NULL::character varying,
    art character varying(8) DEFAULT NULL::character varying,
    herkunft character varying(2) DEFAULT NULL::character varying,
    objnr character varying(22) DEFAULT NULL::character varying,
    obtyp character varying(3) DEFAULT NULL::character varying,
    stat11 character varying(1) DEFAULT NULL::character varying,
    insmk character varying(1) DEFAULT NULL::character varying,
    stat01 character varying(1) DEFAULT NULL::character varying,
    stat08 character varying(1) DEFAULT NULL::character varying,
    kzskiplot character varying(1) DEFAULT NULL::character varying,
    dyn character varying(1) DEFAULT NULL::character varying,
    hpz character varying(1) DEFAULT NULL::character varying,
    ein character varying(1) DEFAULT NULL::character varying,
    anzsn integer,
    stat30 character varying(1) DEFAULT NULL::character varying,
    qinfstatus character varying(8) DEFAULT NULL::character varying,
    enstehdat timestamp without time zone,
    entstezeit time without time zone,
    ersteller character varying(12) DEFAULT NULL::character varying,
    ersteldat timestamp without time zone,
    erstelzeit time without time zone,
    aenderer character varying(12) DEFAULT NULL::character varying,
    aenderdat timestamp without time zone,
    aenderzeit time without time zone,
    pastrterm timestamp without time zone,
    pastrzeit time without time zone,
    paendterm timestamp without time zone,
    paendzeit time without time zone,
    zaehl integer,
    zkriz integer,
    zaehl1 integer,
    selmatnr character varying(18) DEFAULT NULL::character varying,
    stat17 character varying(1) DEFAULT NULL::character varying,
    selherst character varying(10) DEFAULT NULL::character varying,
    selkunnr character varying(10) DEFAULT NULL::character varying,
    aufnr character varying(12) DEFAULT NULL::character varying,
    verid character varying(4) DEFAULT NULL::character varying,
    sa_aufnr character varying(12) DEFAULT NULL::character varying,
    kunnr character varying(10) DEFAULT NULL::character varying,
    lifnr character varying(10) DEFAULT NULL::character varying,
    matnr character varying(18) DEFAULT NULL::character varying,
    charg character varying(10) DEFAULT NULL::character varying,
    lagortchrg character varying(4) DEFAULT NULL::character varying,
    zeugnisbis timestamp without time zone,
    ps_psp_pnr integer,
    kdpos integer,
    ekorg character varying(4) DEFAULT NULL::character varying,
    ebeln character varying(10) DEFAULT NULL::character varying,
    ebelp integer,
    etenr integer,
    mjahr integer,
    mblnr character varying(10) DEFAULT NULL::character varying,
    zeile integer,
    budat timestamp without time zone,
    bwart character varying(3) DEFAULT NULL::character varying,
    ktextlos character varying(40) DEFAULT NULL::character varying,
    ltextkz character varying(1) DEFAULT NULL::character varying,
    ktextmat character varying(40) DEFAULT NULL::character varying,
    losmenge numeric(13,3) DEFAULT NULL::numeric,
    mengeneinh character varying(3) DEFAULT NULL::character varying,
    lmenge01 numeric(13,3) DEFAULT NULL::numeric,
    lmenge02 numeric(13,3) DEFAULT NULL::numeric,
    lmenge03 numeric(13,3) DEFAULT NULL::numeric,
    lmenge04 numeric(13,3) DEFAULT NULL::numeric,
    lmenge05 numeric(13,3) DEFAULT NULL::numeric,
    lmenge06 numeric(13,3) DEFAULT NULL::numeric,
    matnrneu character varying(18) DEFAULT NULL::character varying,
    chargneu character varying(10) DEFAULT NULL::character varying,
    lmenge07 numeric(13,3) DEFAULT NULL::numeric,
    lmenge08 numeric(13,3) DEFAULT NULL::numeric,
    lmenge09 numeric(13,3) DEFAULT NULL::numeric,
    lmengezub bigint,
    lmengelz bigint,
    lmengepr bigint,
    lmengezer bigint,
    lmengeist bigint,
    lmengesch bigint,
    ltextkzbb character varying(1) DEFAULT NULL::character varying,
    qpmatlos character varying(16) DEFAULT NULL::character varying,
    aufnr_co character varying(12) DEFAULT NULL::character varying,
    kzvbr character varying(1) DEFAULT NULL::character varying,
    knttp character varying(1) DEFAULT NULL::character varying,
    pstyp character varying(1) DEFAULT NULL::character varying,
    stat05 character varying(1) DEFAULT NULL::character varying,
    kostl character varying(10) DEFAULT NULL::character varying,
    aufps integer,
    kont_pspnr integer,
    nplnr character varying(12) DEFAULT NULL::character varying,
    aplzl integer,
    dabrz timestamp without time zone,
    kstrg character varying(12) DEFAULT NULL::character varying,
    paobjnr integer,
    prctr character varying(10) DEFAULT NULL::character varying,
    gsber character varying(4) DEFAULT NULL::character varying,
    konto character varying(10) DEFAULT NULL::character varying,
    kokrs character varying(4) DEFAULT NULL::character varying,
    bukrs character varying(4) DEFAULT NULL::character varying,
    los_ref bigint,
    project character varying(24) DEFAULT NULL::character varying,
    gate_entry_no character varying(10) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.qals;
       public         heap    postgres    false            /           0    0    COLUMN qals.prueflos    COMMENT     C   COMMENT ON COLUMN public.qals.prueflos IS 'Inspection Lot Number';
          public          postgres    false    266            0           0    0    COLUMN qals.werk    COMMENT     /   COMMENT ON COLUMN public.qals.werk IS 'Plant';
          public          postgres    false    266            1           0    0    COLUMN qals.art    COMMENT     8   COMMENT ON COLUMN public.qals.art IS 'Inspection Type';
          public          postgres    false    266            2           0    0    COLUMN qals.herkunft    COMMENT     C   COMMENT ON COLUMN public.qals.herkunft IS 'Inspection Lot Origin';
          public          postgres    false    266            3           0    0    COLUMN qals.objnr    COMMENT     8   COMMENT ON COLUMN public.qals.objnr IS 'Object number';
          public          postgres    false    266            4           0    0    COLUMN qals.obtyp    COMMENT     :   COMMENT ON COLUMN public.qals.obtyp IS 'Object Category';
          public          postgres    false    266            5           0    0    COLUMN qals.stat11    COMMENT     <   COMMENT ON COLUMN public.qals.stat11 IS 'GR blocked stock';
          public          postgres    false    266            6           0    0    COLUMN qals.insmk    COMMENT     Q   COMMENT ON COLUMN public.qals.insmk IS 'Quantity Is or Was in Inspection Stock';
          public          postgres    false    266            7           0    0    COLUMN qals.stat01    COMMENT     S   COMMENT ON COLUMN public.qals.stat01 IS 'Inspection Lot is Created Automatically';
          public          postgres    false    266            8           0    0    COLUMN qals.stat08    COMMENT     L   COMMENT ON COLUMN public.qals.stat08 IS 'Automatic Usage Decision Planned';
          public          postgres    false    266            9           0    0    COLUMN qals.kzskiplot    COMMENT     :   COMMENT ON COLUMN public.qals.kzskiplot IS 'Lot Skipped';
          public          postgres    false    266            :           0    0    COLUMN qals.dyn    COMMENT     6   COMMENT ON COLUMN public.qals.dyn IS 'Skips Allowed';
          public          postgres    false    266            ;           0    0    COLUMN qals.hpz    COMMENT     8   COMMENT ON COLUMN public.qals.hpz IS '100% Inspection';
          public          postgres    false    266            <           0    0    COLUMN qals.ein    COMMENT     J   COMMENT ON COLUMN public.qals.ein IS 'Serial Number Management Possible';
          public          postgres    false    266            =           0    0    COLUMN qals.anzsn    COMMENT     C   COMMENT ON COLUMN public.qals.anzsn IS 'Number of serial numbers';
          public          postgres    false    266            >           0    0    COLUMN qals.stat30    COMMENT     f   COMMENT ON COLUMN public.qals.stat30 IS 'Origin of Inspection Lot Unit of Measure for LIS Interface';
          public          postgres    false    266            ?           0    0    COLUMN qals.qinfstatus    COMMENT     ;   COMMENT ON COLUMN public.qals.qinfstatus IS 'QINF Status';
          public          postgres    false    266            @           0    0    COLUMN qals.enstehdat    COMMENT     C   COMMENT ON COLUMN public.qals.enstehdat IS 'Date of Lot Creation';
          public          postgres    false    266            A           0    0    COLUMN qals.entstezeit    COMMENT     D   COMMENT ON COLUMN public.qals.entstezeit IS 'Time of Lot Creation';
          public          postgres    false    266            B           0    0    COLUMN qals.ersteller    COMMENT     W   COMMENT ON COLUMN public.qals.ersteller IS 'Name of User Who Created the Data Record';
          public          postgres    false    266            C           0    0    COLUMN qals.ersteldat    COMMENT     X   COMMENT ON COLUMN public.qals.ersteldat IS 'Date on Which the Data Record Was Created';
          public          postgres    false    266            D           0    0    COLUMN qals.erstelzeit    COMMENT     D   COMMENT ON COLUMN public.qals.erstelzeit IS 'Time of Lot Creation';
          public          postgres    false    266            E           0    0    COLUMN qals.aenderer    COMMENT     d   COMMENT ON COLUMN public.qals.aenderer IS 'Name of User who Most Recently Changed the Data Record';
          public          postgres    false    266            F           0    0    COLUMN qals.aenderdat    COMMENT     T   COMMENT ON COLUMN public.qals.aenderdat IS 'Date on Which Data Record Was Changed';
          public          postgres    false    266            G           0    0    COLUMN qals.aenderzeit    COMMENT     B   COMMENT ON COLUMN public.qals.aenderzeit IS 'Time of Lot Change';
          public          postgres    false    266            H           0    0    COLUMN qals.pastrterm    COMMENT     D   COMMENT ON COLUMN public.qals.pastrterm IS 'Inspection Start Date';
          public          postgres    false    266            I           0    0    COLUMN qals.pastrzeit    COMMENT     D   COMMENT ON COLUMN public.qals.pastrzeit IS 'Inspection Start Time';
          public          postgres    false    266            J           0    0    COLUMN qals.paendterm    COMMENT     I   COMMENT ON COLUMN public.qals.paendterm IS 'End Date of the Inspection';
          public          postgres    false    266            K           0    0    COLUMN qals.paendzeit    COMMENT     B   COMMENT ON COLUMN public.qals.paendzeit IS 'Inspection End Time';
          public          postgres    false    266            L           0    0    COLUMN qals.zaehl    COMMENT     ;   COMMENT ON COLUMN public.qals.zaehl IS 'Internal counter';
          public          postgres    false    266            M           0    0    COLUMN qals.zkriz    COMMENT     J   COMMENT ON COLUMN public.qals.zkriz IS 'Counter for additional criteria';
          public          postgres    false    266            N           0    0    COLUMN qals.zaehl1    COMMENT     <   COMMENT ON COLUMN public.qals.zaehl1 IS 'Internal counter';
          public          postgres    false    266            O           0    0    COLUMN qals.selmatnr    COMMENT     =   COMMENT ON COLUMN public.qals.selmatnr IS 'Material Number';
          public          postgres    false    266            P           0    0    COLUMN qals.stat17    COMMENT     S   COMMENT ON COLUMN public.qals.stat17 IS 'Manufacturer Part No. Processing Active';
          public          postgres    false    266            Q           0    0    COLUMN qals.selherst    COMMENT     D   COMMENT ON COLUMN public.qals.selherst IS 'Number of Manufacturer';
          public          postgres    false    266            R           0    0    COLUMN qals.selkunnr    COMMENT     H   COMMENT ON COLUMN public.qals.selkunnr IS 'Account number of customer';
          public          postgres    false    266            S           0    0    COLUMN qals.aufnr    COMMENT     7   COMMENT ON COLUMN public.qals.aufnr IS 'Order Number';
          public          postgres    false    266            T           0    0    COLUMN qals.verid    COMMENT     =   COMMENT ON COLUMN public.qals.verid IS 'Production Version';
          public          postgres    false    266            U           0    0    COLUMN qals.sa_aufnr    COMMENT     H   COMMENT ON COLUMN public.qals.sa_aufnr IS 'Run schedule header number';
          public          postgres    false    266            V           0    0    COLUMN qals.kunnr    COMMENT     C   COMMENT ON COLUMN public.qals.kunnr IS 'Customer (Ship-To Party)';
          public          postgres    false    266            W           0    0    COLUMN qals.lifnr    COMMENT     E   COMMENT ON COLUMN public.qals.lifnr IS 'Supplier''s Account Number';
          public          postgres    false    266            X           0    0    COLUMN qals.matnr    COMMENT     :   COMMENT ON COLUMN public.qals.matnr IS 'Material Number';
          public          postgres    false    266            Y           0    0    COLUMN qals.charg    COMMENT     7   COMMENT ON COLUMN public.qals.charg IS 'Batch Number';
          public          postgres    false    266            Z           0    0    COLUMN qals.lagortchrg    COMMENT     @   COMMENT ON COLUMN public.qals.lagortchrg IS 'Storage Location';
          public          postgres    false    266            [           0    0    COLUMN qals.zeugnisbis    COMMENT     W   COMMENT ON COLUMN public.qals.zeugnisbis IS 'Valid-To Date for The Batch Certificate';
          public          postgres    false    266            \           0    0    COLUMN qals.ps_psp_pnr    COMMENT     V   COMMENT ON COLUMN public.qals.ps_psp_pnr IS 'Valuated Sales Order Stock WBS Element';
          public          postgres    false    266            ]           0    0    COLUMN qals.kdpos    COMMENT     Y   COMMENT ON COLUMN public.qals.kdpos IS 'Sales Order Item of Valuated Sales Order Stock';
          public          postgres    false    266            ^           0    0    COLUMN qals.ekorg    COMMENT     B   COMMENT ON COLUMN public.qals.ekorg IS 'Purchasing Organization';
          public          postgres    false    266            _           0    0    COLUMN qals.ebeln    COMMENT     E   COMMENT ON COLUMN public.qals.ebeln IS 'Purchasing Document Number';
          public          postgres    false    266            `           0    0    COLUMN qals.ebelp    COMMENT     M   COMMENT ON COLUMN public.qals.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    266            a           0    0    COLUMN qals.etenr    COMMENT     I   COMMENT ON COLUMN public.qals.etenr IS 'Delivery Schedule Line Counter';
          public          postgres    false    266            b           0    0    COLUMN qals.mjahr    COMMENT     A   COMMENT ON COLUMN public.qals.mjahr IS 'Material Document Year';
          public          postgres    false    266            c           0    0    COLUMN qals.mblnr    COMMENT     F   COMMENT ON COLUMN public.qals.mblnr IS 'Number of Material Document';
          public          postgres    false    266            d           0    0    COLUMN qals.zeile    COMMENT     D   COMMENT ON COLUMN public.qals.zeile IS 'Item in Material Document';
          public          postgres    false    266            e           0    0    COLUMN qals.budat    COMMENT     G   COMMENT ON COLUMN public.qals.budat IS 'Posting Date in the Document';
          public          postgres    false    266            f           0    0    COLUMN qals.bwart    COMMENT     O   COMMENT ON COLUMN public.qals.bwart IS 'Movement Type (Inventory Management)';
          public          postgres    false    266            g           0    0    COLUMN qals.ktextlos    COMMENT     8   COMMENT ON COLUMN public.qals.ktextlos IS 'Short Text';
          public          postgres    false    266            h           0    0    COLUMN qals.ltextkz    COMMENT     P   COMMENT ON COLUMN public.qals.ltextkz IS 'Long Text Exists For Inspection Lot';
          public          postgres    false    266            i           0    0    COLUMN qals.ktextmat    COMMENT     N   COMMENT ON COLUMN public.qals.ktextmat IS 'Short Text for Inspection Object';
          public          postgres    false    266            j           0    0    COLUMN qals.losmenge    COMMENT     E   COMMENT ON COLUMN public.qals.losmenge IS 'Inspection Lot Quantity';
          public          postgres    false    266            k           0    0    COLUMN qals.mengeneinh    COMMENT     `   COMMENT ON COLUMN public.qals.mengeneinh IS 'Base Unit of Measure for Inspection Lot Quantity';
          public          postgres    false    266            l           0    0    COLUMN qals.lmenge01    COMMENT     W   COMMENT ON COLUMN public.qals.lmenge01 IS 'Quantity Posted to Unrestricted-Use Stock';
          public          postgres    false    266            m           0    0    COLUMN qals.lmenge02    COMMENT     F   COMMENT ON COLUMN public.qals.lmenge02 IS 'Quantity Posted to Scrap';
          public          postgres    false    266            n           0    0    COLUMN qals.lmenge03    COMMENT     G   COMMENT ON COLUMN public.qals.lmenge03 IS 'Quantity Posted to Sample';
          public          postgres    false    266            o           0    0    COLUMN qals.lmenge04    COMMENT     N   COMMENT ON COLUMN public.qals.lmenge04 IS 'Quantity Posted to Blocked Stock';
          public          postgres    false    266            p           0    0    COLUMN qals.lmenge05    COMMENT     I   COMMENT ON COLUMN public.qals.lmenge05 IS 'Quantity Posted to Reserves';
          public          postgres    false    266            q           0    0    COLUMN qals.lmenge06    COMMENT     Q   COMMENT ON COLUMN public.qals.lmenge06 IS 'Quantity Posted to Another Material';
          public          postgres    false    266            r           0    0    COLUMN qals.matnrneu    COMMENT     ]   COMMENT ON COLUMN public.qals.matnrneu IS 'Material Number to Which the Quantity is Posted';
          public          postgres    false    266            s           0    0    COLUMN qals.chargneu    COMMENT     R   COMMENT ON COLUMN public.qals.chargneu IS 'Batch to Which Goods Are Transferred';
          public          postgres    false    266            t           0    0    COLUMN qals.lmenge07    COMMENT     I   COMMENT ON COLUMN public.qals.lmenge07 IS 'Quantity Returned to Vendor';
          public          postgres    false    266            u           0    0    COLUMN qals.lmenge08    COMMENT     ]   COMMENT ON COLUMN public.qals.lmenge08 IS 'Other Quantity Posted from Inspection Lot Stock';
          public          postgres    false    266            v           0    0    COLUMN qals.lmenge09    COMMENT     a   COMMENT ON COLUMN public.qals.lmenge09 IS 'Other Quantity (2) Posted from Inspection Lot Stock';
          public          postgres    false    266            w           0    0    COLUMN qals.lmengezub    COMMENT     K   COMMENT ON COLUMN public.qals.lmengezub IS 'Quantity That Must Be Posted';
          public          postgres    false    266            x           0    0    COLUMN qals.lmengelz    COMMENT     [   COMMENT ON COLUMN public.qals.lmengelz IS 'Sample Quantity for Long-Term Characteristics';
          public          postgres    false    266            y           0    0    COLUMN qals.lmengepr    COMMENT     I   COMMENT ON COLUMN public.qals.lmengepr IS 'Quantity Actually Inspected';
          public          postgres    false    266            z           0    0    COLUMN qals.lmengezer    COMMENT     S   COMMENT ON COLUMN public.qals.lmengezer IS 'Quantity Destroyed During Inspection';
          public          postgres    false    266            {           0    0    COLUMN qals.lmengeist    COMMENT     B   COMMENT ON COLUMN public.qals.lmengeist IS 'Actual Lot Quantity';
          public          postgres    false    266            |           0    0    COLUMN qals.lmengesch    COMMENT     W   COMMENT ON COLUMN public.qals.lmengesch IS 'Defective Quantity in Inspected Quantity';
          public          postgres    false    266            }           0    0    COLUMN qals.ltextkzbb    COMMENT     L   COMMENT ON COLUMN public.qals.ltextkzbb IS 'Logs Exist for Usage Decision';
          public          postgres    false    266            ~           0    0    COLUMN qals.qpmatlos    COMMENT     D   COMMENT ON COLUMN public.qals.qpmatlos IS 'Allowed Share of Scrap';
          public          postgres    false    266                       0    0    COLUMN qals.aufnr_co    COMMENT     X   COMMENT ON COLUMN public.qals.aufnr_co IS 'Order Number for Recording Appraisal Costs';
          public          postgres    false    266            �           0    0    COLUMN qals.kzvbr    COMMENT     >   COMMENT ON COLUMN public.qals.kzvbr IS 'Consumption posting';
          public          postgres    false    266            �           0    0    COLUMN qals.knttp    COMMENT     F   COMMENT ON COLUMN public.qals.knttp IS 'Account Assignment Category';
          public          postgres    false    266            �           0    0    COLUMN qals.pstyp    COMMENT     O   COMMENT ON COLUMN public.qals.pstyp IS 'Item category in purchasing document';
          public          postgres    false    266            �           0    0    COLUMN qals.stat05    COMMENT     R   COMMENT ON COLUMN public.qals.stat05 IS 'Account Assignment Key: Inspection Lot';
          public          postgres    false    266            �           0    0    COLUMN qals.kostl    COMMENT     6   COMMENT ON COLUMN public.qals.kostl IS 'Cost Center';
          public          postgres    false    266            �           0    0    COLUMN qals.aufps    COMMENT     ^   COMMENT ON COLUMN public.qals.aufps IS 'Item Number of Reservation / Dependent Requirements';
          public          postgres    false    266            �           0    0    COLUMN qals.kont_pspnr    COMMENT     ^   COMMENT ON COLUMN public.qals.kont_pspnr IS 'Work Breakdown Structure Element (WBS Element)';
          public          postgres    false    266            �           0    0    COLUMN qals.nplnr    COMMENT     P   COMMENT ON COLUMN public.qals.nplnr IS 'Network Number for Account Assignment';
          public          postgres    false    266            �           0    0    COLUMN qals.aplzl    COMMENT     ;   COMMENT ON COLUMN public.qals.aplzl IS 'Internal counter';
          public          postgres    false    266            �           0    0    COLUMN qals.dabrz    COMMENT     H   COMMENT ON COLUMN public.qals.dabrz IS 'Reference date for settlement';
          public          postgres    false    266            �           0    0    COLUMN qals.kstrg    COMMENT     6   COMMENT ON COLUMN public.qals.kstrg IS 'Cost Object';
          public          postgres    false    266            �           0    0    COLUMN qals.paobjnr    COMMENT     Q   COMMENT ON COLUMN public.qals.paobjnr IS 'Profitability Segment Number (CO-PA)';
          public          postgres    false    266            �           0    0    COLUMN qals.prctr    COMMENT     8   COMMENT ON COLUMN public.qals.prctr IS 'Profit Center';
          public          postgres    false    266            �           0    0    COLUMN qals.gsber    COMMENT     8   COMMENT ON COLUMN public.qals.gsber IS 'Business Area';
          public          postgres    false    266            �           0    0    COLUMN qals.konto    COMMENT     =   COMMENT ON COLUMN public.qals.konto IS 'G/L Account Number';
          public          postgres    false    266            �           0    0    COLUMN qals.kokrs    COMMENT     ;   COMMENT ON COLUMN public.qals.kokrs IS 'Controlling Area';
          public          postgres    false    266            �           0    0    COLUMN qals.bukrs    COMMENT     7   COMMENT ON COLUMN public.qals.bukrs IS 'Company Code';
          public          postgres    false    266            �           0    0    COLUMN qals.los_ref    COMMENT     V   COMMENT ON COLUMN public.qals.los_ref IS 'Inspection Lot Number Which Is Referenced';
          public          postgres    false    266            �           0    0    COLUMN qals.project    COMMENT     [   COMMENT ON COLUMN public.qals.project IS 'Work Breakdown Structure Element (WBS Element)';
          public          postgres    false    266            �           0    0    COLUMN qals.gate_entry_no    COMMENT     D   COMMENT ON COLUMN public.qals.gate_entry_no IS 'Gate Entry Number';
          public          postgres    false    266            �           0    0    COLUMN qals.created_at    COMMENT     <   COMMENT ON COLUMN public.qals.created_at IS 'Created time';
          public          postgres    false    266            �           0    0    COLUMN qals.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.qals.last_changed_at IS 'Last change time';
          public          postgres    false    266                       1259    50416    qap_save    TABLE       CREATE TABLE public.qap_save (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    remarks text NOT NULL,
    created_by_id character varying(50) NOT NULL,
    created_at bigint NOT NULL
);
    DROP TABLE public.qap_save;
       public         heap    postgres    false                       1259    50421    qap_save_id_seq    SEQUENCE     �   CREATE SEQUENCE public.qap_save_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.qap_save_id_seq;
       public          postgres    false    267            �           0    0    qap_save_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.qap_save_id_seq OWNED BY public.qap_save.id;
          public          postgres    false    268                       1259    50422    qap_submission    TABLE     �  CREATE TABLE public.qap_submission (
    id integer NOT NULL,
    reference_no character varying(60) DEFAULT NULL::character varying,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    vendor_code character varying(100) DEFAULT NULL::character varying,
    assigned_from character varying(100) DEFAULT NULL::character varying,
    assigned_to character varying(100) DEFAULT NULL::character varying,
    is_assign integer NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    action_type character varying(100) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_name character varying(255) DEFAULT NULL::character varying,
    created_by_id character varying(200) NOT NULL,
    supporting_doc text
);
 "   DROP TABLE public.qap_submission;
       public         heap    postgres    false                       1259    50435    qap_submission_id_seq    SEQUENCE     �   CREATE SEQUENCE public.qap_submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.qap_submission_id_seq;
       public          postgres    false    269            �           0    0    qap_submission_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.qap_submission_id_seq OWNED BY public.qap_submission.id;
          public          postgres    false    270                       1259    50436    qave    TABLE     �  CREATE TABLE public.qave (
    prueflos bigint NOT NULL,
    kzart character varying(1) NOT NULL,
    zaehler character varying(6) NOT NULL,
    vkatart character varying(1) DEFAULT NULL::character varying,
    vwerks character varying(4) DEFAULT NULL::character varying,
    vauswahlmg character varying(8) DEFAULT NULL::character varying,
    vcodegrp character varying(8) DEFAULT NULL::character varying,
    vcode character varying(4) DEFAULT NULL::character varying,
    versionam character varying(6) DEFAULT NULL::character varying,
    versioncd character varying(6) DEFAULT NULL::character varying,
    vbewertung character varying(1) DEFAULT NULL::character varying,
    dbewertung character varying(1) DEFAULT NULL::character varying,
    vfolgeakti character varying(8) DEFAULT NULL::character varying,
    qkennzahl numeric(3,3) DEFAULT NULL::numeric,
    ltextkz character varying(1) DEFAULT NULL::character varying,
    vname character varying(12) DEFAULT NULL::character varying,
    vdatum date,
    vezeiterf time(0) without time zone DEFAULT NULL::time without time zone,
    vaename character varying(12) DEFAULT NULL::character varying,
    vaedatum date,
    vezeitaen time(0) without time zone DEFAULT NULL::time without time zone,
    stafo character varying(6) DEFAULT NULL::character varying,
    teillos integer,
    vorglfnr integer,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.qave;
       public         heap    postgres    false            �           0    0    COLUMN qave.prueflos    COMMENT     C   COMMENT ON COLUMN public.qave.prueflos IS 'Inspection Lot Number';
          public          postgres    false    271            �           0    0    COLUMN qave.kzart    COMMENT     ]   COMMENT ON COLUMN public.qave.kzart IS 'Inspection Lot, Partial Lot, Single Unit, Interval';
          public          postgres    false    271            �           0    0    COLUMN qave.zaehler    COMMENT     G   COMMENT ON COLUMN public.qave.zaehler IS 'Counter for Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vkatart    COMMENT     4   COMMENT ON COLUMN public.qave.vkatart IS 'Catalog';
          public          postgres    false    271            �           0    0    COLUMN qave.vwerks    COMMENT     1   COMMENT ON COLUMN public.qave.vwerks IS 'Plant';
          public          postgres    false    271            �           0    0    COLUMN qave.vauswahlmg    COMMENT     R   COMMENT ON COLUMN public.qave.vauswahlmg IS 'Selected Set of the Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vcodegrp    COMMENT     N   COMMENT ON COLUMN public.qave.vcodegrp IS 'Code Group of the Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vcode    COMMENT     >   COMMENT ON COLUMN public.qave.vcode IS 'Usage Decision Code';
          public          postgres    false    271            �           0    0    COLUMN qave.versionam    COMMENT     X   COMMENT ON COLUMN public.qave.versionam IS 'Version Number of the Selected Set Record';
          public          postgres    false    271            �           0    0    COLUMN qave.versioncd    COMMENT     P   COMMENT ON COLUMN public.qave.versioncd IS 'Version Number of the Code Record';
          public          postgres    false    271            �           0    0    COLUMN qave.vbewertung    COMMENT     >   COMMENT ON COLUMN public.qave.vbewertung IS 'Code Valuation';
          public          postgres    false    271            �           0    0    COLUMN qave.dbewertung    COMMENT     j   COMMENT ON COLUMN public.qave.dbewertung IS 'Dynamic Modif. Valuation According to Worst Case Principle';
          public          postgres    false    271            �           0    0    COLUMN qave.vfolgeakti    COMMENT     @   COMMENT ON COLUMN public.qave.vfolgeakti IS 'Follow-Up Action';
          public          postgres    false    271            �           0    0    COLUMN qave.qkennzahl    COMMENT     <   COMMENT ON COLUMN public.qave.qkennzahl IS 'Quality Score';
          public          postgres    false    271            �           0    0    COLUMN qave.ltextkz    COMMENT     I   COMMENT ON COLUMN public.qave.ltextkz IS 'Long Text for Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vname    COMMENT     M   COMMENT ON COLUMN public.qave.vname IS 'Person who Made the Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vdatum    COMMENT     P   COMMENT ON COLUMN public.qave.vdatum IS 'Date of Code Used for Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vezeiterf    COMMENT     T   COMMENT ON COLUMN public.qave.vezeiterf IS 'Time when Usage Decision Was Recorded';
          public          postgres    false    271            �           0    0    COLUMN qave.vaename    COMMENT     R   COMMENT ON COLUMN public.qave.vaename IS 'Person who Changed the Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vaedatum    COMMENT     K   COMMENT ON COLUMN public.qave.vaedatum IS 'Change Date of Usage Decision';
          public          postgres    false    271            �           0    0    COLUMN qave.vezeitaen    COMMENT     O   COMMENT ON COLUMN public.qave.vezeitaen IS 'Time when Usage Decision Changed';
          public          postgres    false    271            �           0    0    COLUMN qave.stafo    COMMENT     M   COMMENT ON COLUMN public.qave.stafo IS 'Update group for statistics update';
          public          postgres    false    271            �           0    0    COLUMN qave.teillos    COMMENT     ?   COMMENT ON COLUMN public.qave.teillos IS 'Partial lot number';
          public          postgres    false    271            �           0    0    COLUMN qave.vorglfnr    COMMENT     Z   COMMENT ON COLUMN public.qave.vorglfnr IS 'Current Node Number from Order Counter APLZL';
          public          postgres    false    271            �           0    0    COLUMN qave.created_at    COMMENT     <   COMMENT ON COLUMN public.qave.created_at IS 'Created time';
          public          postgres    false    271            �           0    0    COLUMN qave.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.qave.last_changed_at IS 'Last change time';
          public          postgres    false    271                       1259    50456    resb    TABLE     #  CREATE TABLE public.resb (
    rsnum integer NOT NULL,
    rspos integer NOT NULL,
    rsart character varying(1) NOT NULL,
    bdart character varying(2) DEFAULT NULL::character varying,
    rssta character varying(1) DEFAULT NULL::character varying,
    kzear character varying(1) DEFAULT NULL::character varying,
    matnr character varying(18) DEFAULT NULL::character varying,
    werks character varying(4) DEFAULT NULL::character varying,
    lgort character varying(4) DEFAULT NULL::character varying,
    charg character varying(10) DEFAULT NULL::character varying,
    bdmng numeric(13,3) DEFAULT NULL::numeric,
    meins character varying(3) DEFAULT NULL::character varying,
    enmng numeric(13,3) DEFAULT NULL::numeric,
    bwart character varying(3) DEFAULT NULL::character varying,
    erfmg numeric(13,3) DEFAULT NULL::numeric,
    xwaok character varying(1) DEFAULT NULL::character varying,
    xloek character varying(1) DEFAULT NULL::character varying,
    pspel integer,
    bdter date,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.resb;
       public         heap    postgres    false            �           0    0    COLUMN resb.rsnum    COMMENT     W   COMMENT ON COLUMN public.resb.rsnum IS 'Number of reservation/dependent requirements';
          public          postgres    false    272            �           0    0    COLUMN resb.rspos    COMMENT     ^   COMMENT ON COLUMN public.resb.rspos IS 'Item Number of Reservation / Dependent Requirements';
          public          postgres    false    272            �           0    0    COLUMN resb.rsart    COMMENT     6   COMMENT ON COLUMN public.resb.rsart IS 'Record type';
          public          postgres    false    272            �           0    0    COLUMN resb.bdart    COMMENT     ;   COMMENT ON COLUMN public.resb.bdart IS 'Requirement type';
          public          postgres    false    272            �           0    0    COLUMN resb.rssta    COMMENT     @   COMMENT ON COLUMN public.resb.rssta IS 'Status of reservation';
          public          postgres    false    272            �           0    0    COLUMN resb.kzear    COMMENT     F   COMMENT ON COLUMN public.resb.kzear IS 'Final Issue for Reservation';
          public          postgres    false    272            �           0    0    COLUMN resb.matnr    COMMENT     :   COMMENT ON COLUMN public.resb.matnr IS 'Material Number';
          public          postgres    false    272            �           0    0    COLUMN resb.werks    COMMENT     0   COMMENT ON COLUMN public.resb.werks IS 'Plant';
          public          postgres    false    272            �           0    0    COLUMN resb.lgort    COMMENT     ;   COMMENT ON COLUMN public.resb.lgort IS 'Storage Location';
          public          postgres    false    272            �           0    0    COLUMN resb.charg    COMMENT     7   COMMENT ON COLUMN public.resb.charg IS 'Batch Number';
          public          postgres    false    272            �           0    0    COLUMN resb.bdmng    COMMENT     ?   COMMENT ON COLUMN public.resb.bdmng IS 'Requirement Quantity';
          public          postgres    false    272            �           0    0    COLUMN resb.meins    COMMENT     ?   COMMENT ON COLUMN public.resb.meins IS 'Base Unit of Measure';
          public          postgres    false    272            �           0    0    COLUMN resb.enmng    COMMENT     =   COMMENT ON COLUMN public.resb.enmng IS 'Quantity withdrawn';
          public          postgres    false    272            �           0    0    COLUMN resb.bwart    COMMENT     O   COMMENT ON COLUMN public.resb.bwart IS 'Movement Type (Inventory Management)';
          public          postgres    false    272            �           0    0    COLUMN resb.erfmg    COMMENT     D   COMMENT ON COLUMN public.resb.erfmg IS 'Quantity in Unit of Entry';
          public          postgres    false    272            �           0    0    COLUMN resb.xwaok    COMMENT     Q   COMMENT ON COLUMN public.resb.xwaok IS 'Goods Movement for Reservation Allowed';
          public          postgres    false    272            �           0    0    COLUMN resb.xloek    COMMENT     :   COMMENT ON COLUMN public.resb.xloek IS 'Item is Deleted';
          public          postgres    false    272            �           0    0    COLUMN resb.pspel    COMMENT     6   COMMENT ON COLUMN public.resb.pspel IS 'WBS Element';
          public          postgres    false    272            �           0    0    COLUMN resb.bdter    COMMENT     M   COMMENT ON COLUMN public.resb.bdter IS 'Requirement Date for the Component';
          public          postgres    false    272            �           0    0    COLUMN resb.created_at    COMMENT     <   COMMENT ON COLUMN public.resb.created_at IS 'Created time';
          public          postgres    false    272            �           0    0    COLUMN resb.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.resb.last_changed_at IS 'Last change time';
          public          postgres    false    272                       1259    50473    rkpf    TABLE     ~  CREATE TABLE public.rkpf (
    rsnum integer NOT NULL,
    rsdat date,
    usnam character varying(12) DEFAULT NULL::character varying,
    bwart character varying(3) DEFAULT NULL::character varying,
    wempf character varying(12) DEFAULT NULL::character varying,
    kostl character varying(10) DEFAULT NULL::character varying,
    ebeln character varying(10) DEFAULT NULL::character varying,
    ebelp integer,
    umwrk character varying(4) DEFAULT NULL::character varying,
    umlgo character varying(4) DEFAULT NULL::character varying,
    ps_psp_pnr integer,
    wbs_desc text,
    created_at bigint,
    last_changed_at bigint
);
    DROP TABLE public.rkpf;
       public         heap    postgres    false            �           0    0    COLUMN rkpf.rsnum    COMMENT     W   COMMENT ON COLUMN public.rkpf.rsnum IS 'Number of reservation/dependent requirements';
          public          postgres    false    273            �           0    0    COLUMN rkpf.rsdat    COMMENT     D   COMMENT ON COLUMN public.rkpf.rsdat IS 'Base date for reservation';
          public          postgres    false    273            �           0    0    COLUMN rkpf.usnam    COMMENT     4   COMMENT ON COLUMN public.rkpf.usnam IS 'User Name';
          public          postgres    false    273            �           0    0    COLUMN rkpf.bwart    COMMENT     O   COMMENT ON COLUMN public.rkpf.bwart IS 'Movement Type (Inventory Management)';
          public          postgres    false    273            �           0    0    COLUMN rkpf.wempf    COMMENT     :   COMMENT ON COLUMN public.rkpf.wempf IS 'Goods recipient';
          public          postgres    false    273            �           0    0    COLUMN rkpf.kostl    COMMENT     6   COMMENT ON COLUMN public.rkpf.kostl IS 'Cost Center';
          public          postgres    false    273            �           0    0    COLUMN rkpf.ebeln    COMMENT     @   COMMENT ON COLUMN public.rkpf.ebeln IS 'Purchase order number';
          public          postgres    false    273            �           0    0    COLUMN rkpf.ebelp    COMMENT     M   COMMENT ON COLUMN public.rkpf.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    273            �           0    0    COLUMN rkpf.umwrk    COMMENT     H   COMMENT ON COLUMN public.rkpf.umwrk IS 'Receiving plant/issuing plant';
          public          postgres    false    273            �           0    0    COLUMN rkpf.umlgo    COMMENT     M   COMMENT ON COLUMN public.rkpf.umlgo IS 'Receiving/issuing storage location';
          public          postgres    false    273            �           0    0    COLUMN rkpf.ps_psp_pnr    COMMENT     ^   COMMENT ON COLUMN public.rkpf.ps_psp_pnr IS 'Work Breakdown Structure Element (WBS Element)';
          public          postgres    false    273            �           0    0    COLUMN rkpf.created_at    COMMENT     <   COMMENT ON COLUMN public.rkpf.created_at IS 'Created time';
          public          postgres    false    273            �           0    0    COLUMN rkpf.last_changed_at    COMMENT     E   COMMENT ON COLUMN public.rkpf.last_changed_at IS 'Last change time';
          public          postgres    false    273                       1259    50485    sdbg    TABLE     �  CREATE TABLE public.sdbg (
    id integer NOT NULL,
    reference_no character varying(60) DEFAULT NULL::character varying,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    action_type character varying(100) DEFAULT NULL::character varying,
    vendor_code character varying(100) DEFAULT NULL::character varying,
    assigned_from character varying(100) DEFAULT NULL::character varying,
    assigned_to character varying(100) DEFAULT NULL::character varying,
    last_assigned integer DEFAULT 0 NOT NULL,
    created_at bigint NOT NULL,
    created_by_name character varying(255) DEFAULT NULL::character varying,
    created_by_id character varying(200) NOT NULL,
    updated_by character varying(255) NOT NULL
);
    DROP TABLE public.sdbg;
       public         heap    postgres    false                       1259    50499 
   sdbg_entry    TABLE     0  CREATE TABLE public.sdbg_entry (
    id integer NOT NULL,
    purchasing_doc_no character varying(18) NOT NULL,
    bank_name character varying(100) NOT NULL,
    branch_name character varying(255) NOT NULL,
    ifsc_code character varying(20) DEFAULT NULL::character varying,
    bank_addr1 character varying(255) NOT NULL,
    bank_addr2 character varying(255) DEFAULT NULL::character varying,
    bank_addr3 character varying(255) DEFAULT NULL::character varying,
    bank_city character varying(255) DEFAULT NULL::character varying,
    bank_pin_code character varying(7) DEFAULT NULL::character varying,
    bg_no character varying(255) NOT NULL,
    bg_date bigint NOT NULL,
    bg_ammount double precision NOT NULL,
    po_date bigint,
    yard_no character varying(255) DEFAULT NULL::character varying,
    validity_date bigint NOT NULL,
    claim_priod character varying(150) NOT NULL,
    check_list_reference character varying(200) NOT NULL,
    check_list_date bigint NOT NULL,
    bg_type character varying(60) NOT NULL,
    vendor_name character varying(100) DEFAULT NULL::character varying,
    vendor_address1 text,
    vendor_address2 text,
    vendor_address3 text,
    vendor_city character varying(60) DEFAULT NULL::character varying,
    vendor_pin_code character varying(255) DEFAULT NULL::character varying,
    extension_date1 bigint NOT NULL,
    extension_date2 bigint,
    extension_date3 bigint,
    extension_date4 bigint,
    extension_date5 bigint,
    extension_date6 bigint,
    release_date bigint NOT NULL,
    demand_notice_date bigint NOT NULL,
    entension_letter_date bigint,
    status character varying(20) NOT NULL,
    created_at bigint NOT NULL,
    last_changed_at bigint,
    created_by character varying(12) NOT NULL,
    reference_no character varying(30) DEFAULT NULL::character varying
);
    DROP TABLE public.sdbg_entry;
       public         heap    postgres    false                       1259    50514    sdbg_entry_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sdbg_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.sdbg_entry_id_seq;
       public          postgres    false    275            �           0    0    sdbg_entry_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.sdbg_entry_id_seq OWNED BY public.sdbg_entry.id;
          public          postgres    false    276                       1259    50515    sdbg_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sdbg_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.sdbg_id_seq;
       public          postgres    false    274            �           0    0    sdbg_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.sdbg_id_seq OWNED BY public.sdbg.id;
          public          postgres    false    277                       1259    50516    shipping_documents    TABLE       CREATE TABLE public.shipping_documents (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    file_name character varying(500) DEFAULT NULL::character varying,
    file_type_id integer,
    file_type_name character varying(255),
    vendor_code character varying(100) NOT NULL,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
 &   DROP TABLE public.shipping_documents;
       public         heap    postgres    false                       1259    50523    shipping_documents_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shipping_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.shipping_documents_id_seq;
       public          postgres    false    278            �           0    0    shipping_documents_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.shipping_documents_id_seq OWNED BY public.shipping_documents.id;
          public          postgres    false    279                       1259    50524 
   store_gate    TABLE     �  CREATE TABLE public.store_gate (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    acc_no character varying(20) NOT NULL,
    gate_date character varying(25) NOT NULL,
    file_name character varying(100) NOT NULL,
    file_path character varying(200) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at character varying(20) NOT NULL,
    created_by_id character varying(20) NOT NULL
);
    DROP TABLE public.store_gate;
       public         heap    postgres    false                       1259    50527 	   store_grn    TABLE     �  CREATE TABLE public.store_grn (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    grn_no character varying(20) NOT NULL,
    file_name character varying(100) NOT NULL,
    file_path character varying(200) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at character varying(20) NOT NULL,
    created_by_id character varying(20) NOT NULL
);
    DROP TABLE public.store_grn;
       public         heap    postgres    false                       1259    50530    store_grn_id_seq    SEQUENCE     �   CREATE SEQUENCE public.store_grn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.store_grn_id_seq;
       public          postgres    false    281            �           0    0    store_grn_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.store_grn_id_seq OWNED BY public.store_grn.id;
          public          postgres    false    282                       1259    50531    store_icgrn    TABLE     �  CREATE TABLE public.store_icgrn (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    icgrn_no character varying(20) NOT NULL,
    icgrn_value character varying(12) NOT NULL,
    file_name character varying(100) NOT NULL,
    file_path character varying(200) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at character varying(20) NOT NULL,
    created_by_id character varying(20) NOT NULL
);
    DROP TABLE public.store_icgrn;
       public         heap    postgres    false                       1259    50534    store_icgrn_id_seq    SEQUENCE     �   CREATE SEQUENCE public.store_icgrn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.store_icgrn_id_seq;
       public          postgres    false    283            �           0    0    store_icgrn_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.store_icgrn_id_seq OWNED BY public.store_icgrn.id;
          public          postgres    false    284                       1259    50535    sub_dept    TABLE     c   CREATE TABLE public.sub_dept (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);
    DROP TABLE public.sub_dept;
       public         heap    postgres    false                       1259    50538    sub_dept_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sub_dept_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sub_dept_id_seq;
       public          postgres    false    285            �           0    0    sub_dept_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sub_dept_id_seq OWNED BY public.sub_dept.id;
          public          postgres    false    286            4           1259    57358    t_email_to_send    TABLE     y  CREATE TABLE public.t_email_to_send (
    id integer NOT NULL,
    event_name character varying(255),
    email_to character varying(255),
    email_subject character varying(255),
    email_cc character varying(255),
    email_bcc character varying(255),
    email_body character varying(4000),
    email_send_on timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(10),
    created_on date DEFAULT CURRENT_DATE,
    modified_by character varying(10),
    modified_on date,
    attachment_path character varying(255),
    activity_name character varying(255) DEFAULT NULL::character varying
);
 #   DROP TABLE public.t_email_to_send;
       public         heap    postgres    false            3           1259    57357    t_email_to_send_id_seq    SEQUENCE     �   CREATE SEQUENCE public.t_email_to_send_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.t_email_to_send_id_seq;
       public          postgres    false    308            �           0    0    t_email_to_send_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.t_email_to_send_id_seq OWNED BY public.t_email_to_send.id;
          public          postgres    false    307                       1259    50539    test    TABLE     U   CREATE TABLE public.test (
    id integer NOT NULL,
    name text,
    email text
);
    DROP TABLE public.test;
       public         heap    postgres    false                        1259    50544    test_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.test_id_seq;
       public          postgres    false    287            �           0    0    test_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;
          public          postgres    false    288            !           1259    50545    tnc_minutes    TABLE     R  CREATE TABLE public.tnc_minutes (
    id integer NOT NULL,
    file_name character varying(500) NOT NULL,
    file_path character varying(500) NOT NULL,
    file_type character varying(500) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(50) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL
);
    DROP TABLE public.tnc_minutes;
       public         heap    postgres    false            "           1259    50550    tnc_minutes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tnc_minutes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tnc_minutes_id_seq;
       public          postgres    false    289            �           0    0    tnc_minutes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tnc_minutes_id_seq OWNED BY public.tnc_minutes.id;
          public          postgres    false    290            #           1259    50551 	   user_role    TABLE     I  CREATE TABLE public.user_role (
    id integer NOT NULL,
    user_type_id integer NOT NULL,
    ven_bill_submit smallint NOT NULL,
    ven_bill_show smallint NOT NULL,
    ven_bill_edit smallint NOT NULL,
    ven_bill_received smallint NOT NULL,
    ven_bill_certified smallint NOT NULL,
    ven_bill_forward integer NOT NULL
);
    DROP TABLE public.user_role;
       public         heap    postgres    false            $           1259    50554    user_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_role_id_seq;
       public          postgres    false    291            �           0    0    user_role_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;
          public          postgres    false    292            %           1259    50555 	   user_type    TABLE     �   CREATE TABLE public.user_type (
    id integer NOT NULL,
    user_type character varying(60) NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL
);
    DROP TABLE public.user_type;
       public         heap    postgres    false            &           1259    50558    user_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_type_id_seq;
       public          postgres    false    293            �           0    0    user_type_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_type_id_seq OWNED BY public.user_type.id;
          public          postgres    false    294            '           1259    50559    vendor_activities    TABLE     "  CREATE TABLE public.vendor_activities (
    id integer NOT NULL,
    purchasing_doc_no character varying(11) DEFAULT NULL::character varying,
    action_type character varying(40) DEFAULT NULL::character varying,
    file_name character varying(300) DEFAULT NULL::character varying,
    file_path character varying(500) DEFAULT NULL::character varying,
    remarks text,
    status character varying(20) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_id character varying(200) NOT NULL
);
 %   DROP TABLE public.vendor_activities;
       public         heap    postgres    false            (           1259    50568    vendor_activities_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendor_activities_id_seq;
       public          postgres    false    295            �           0    0    vendor_activities_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendor_activities_id_seq OWNED BY public.vendor_activities.id;
          public          postgres    false    296            )           1259    50569    wbs    TABLE     �   CREATE TABLE public.wbs (
    wbs_id character varying(11) NOT NULL,
    project_code character varying(11) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL
);
    DROP TABLE public.wbs;
       public         heap    postgres    false            1           1259    50944    wdc    TABLE     V  CREATE TABLE public.wdc (
    id integer NOT NULL,
    reference_no character varying(60) NOT NULL,
    purchasing_doc_no character varying(11) NOT NULL,
    action_type character varying(16) NOT NULL,
    work_done_by character varying(40) NOT NULL,
    work_title character varying(200) DEFAULT NULL::character varying,
    vendor_code character varying(100) DEFAULT NULL::character varying,
    inspection_note_ref_no character varying(200) DEFAULT NULL::character varying,
    file_inspection_note_ref_no text,
    hinderence_report_cerified_by_berth character varying(200) DEFAULT NULL::character varying,
    file_hinderence_report_cerified_by_berth text,
    attendance_report character varying(200) DEFAULT NULL::character varying,
    file_attendance_report text,
    yard_no character varying(60) NOT NULL,
    stage_details text,
    job_location character varying(100) NOT NULL,
    unit character varying(10) DEFAULT NULL::character varying,
    line_item_array text,
    guarantee_defect_liability_start_date bigint,
    guarantee_defect_liability_end_date bigint,
    guarantee_defect_liability_status character varying(16) DEFAULT NULL::character varying,
    total_amount numeric(10,3) DEFAULT NULL::numeric,
    total_amount_status character varying(15) DEFAULT NULL::character varying,
    remarks character varying(240) NOT NULL,
    status character varying(14) NOT NULL,
    updated_by character varying(30) NOT NULL,
    created_at bigint NOT NULL,
    created_by_name text,
    created_by_id character varying(200) NOT NULL,
    assigned_to character varying(15) DEFAULT NULL::character varying
);
    DROP TABLE public.wdc;
       public         heap    postgres    false            2           1259    50959 
   wdc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.wdc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.wdc_id_seq;
       public          postgres    false    305            �           0    0 
   wdc_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.wdc_id_seq OWNED BY public.wdc.id;
          public          postgres    false    306            *           1259    50572    zbts_st    TABLE     �  CREATE TABLE public.zbts_st (
    zbtno character varying(11) NOT NULL,
    rerdat date,
    rerzet time without time zone,
    rernam character varying(12) DEFAULT NULL::character varying,
    rlaeda date,
    rctime time without time zone,
    raenam character varying(12) DEFAULT NULL::character varying,
    lifnr character varying(10) DEFAULT NULL::character varying,
    zvbno character varying(40) DEFAULT NULL::character varying,
    ven_bill_date date,
    ebeln character varying(10) DEFAULT NULL::character varying,
    dpernr1 integer,
    drerdat1 date,
    drerzet1 time without time zone,
    drernam1 character varying(12) DEFAULT NULL::character varying,
    dpernr2 integer,
    drerdat2 date,
    drerzet2 time without time zone,
    drernam2 character varying(12) DEFAULT NULL::character varying,
    daerdat date,
    daerzet time without time zone,
    daernam character varying(12) DEFAULT NULL::character varying,
    dalaeda date,
    daaenam character varying(12) DEFAULT NULL::character varying,
    deerdat date,
    deerzet time without time zone,
    deernam character varying(12) DEFAULT NULL::character varying,
    delaeda date,
    deaenam character varying(12) DEFAULT NULL::character varying,
    dferdat date,
    dferzet time without time zone,
    dfernam character varying(12) DEFAULT NULL::character varying,
    dflaeda date,
    dfaenam character varying(12) DEFAULT NULL::character varying,
    zrmk1 character varying(140) DEFAULT NULL::character varying,
    dstatus character varying(1) DEFAULT NULL::character varying,
    fpernr1 integer,
    zrmk2 character varying(140) DEFAULT NULL::character varying,
    fpernr2 integer,
    zdcomment character varying(255) DEFAULT NULL::character varying,
    zrmk3 character varying(140) DEFAULT NULL::character varying,
    zrmk4 character varying(140) DEFAULT NULL::character varying,
    zfcomment character varying(255) DEFAULT NULL::character varying,
    fstatus character varying(1) DEFAULT NULL::character varying,
    bstatus character varying(1) DEFAULT NULL::character varying,
    unitno character varying(4) DEFAULT NULL::character varying,
    comno character varying(3) DEFAULT NULL::character varying,
    frerdat date,
    frerzet time without time zone,
    frernam character varying(12) DEFAULT NULL::character varying,
    frlaeda date,
    fraenam character varying(12) DEFAULT NULL::character varying,
    faerdat date,
    faerzet time without time zone,
    faernam character varying(12) DEFAULT NULL::character varying,
    falaeda date,
    faaenam character varying(12) DEFAULT NULL::character varying,
    feerdat date,
    feerzet time without time zone,
    feernam character varying(12) DEFAULT NULL::character varying,
    felaeda date,
    feaenam character varying(12) DEFAULT NULL::character varying,
    fperdat date,
    fperzet time without time zone,
    fpernam character varying(12) DEFAULT NULL::character varying,
    fplaeda date,
    fpaenam character varying(12) DEFAULT NULL::character varying,
    bperdat date,
    bperzet time without time zone,
    bpernam character varying(12) DEFAULT NULL::character varying,
    bplaeda date,
    bpaenam character varying(12) DEFAULT NULL::character varying,
    hold character varying(1) DEFAULT NULL::character varying,
    alert_gm character varying(1) DEFAULT NULL::character varying,
    alert_dir character varying(1) DEFAULT NULL::character varying,
    alert_agm_dgm character varying(1) DEFAULT NULL::character varying
);
    DROP TABLE public.zbts_st;
       public         heap    postgres    false            �           0    0    COLUMN zbts_st.zbtno    COMMENT     B   COMMENT ON COLUMN public.zbts_st.zbtno IS 'Bill Tracking Number';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.rerdat    COMMENT     F   COMMENT ON COLUMN public.zbts_st.rerdat IS 'Registration Created On';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.rerzet    COMMENT     F   COMMENT ON COLUMN public.zbts_st.rerzet IS 'Registration Entry time';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.rernam    COMMENT     b   COMMENT ON COLUMN public.zbts_st.rernam IS 'Registration: Name of Person Who Created the Object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.rlaeda    COMMENT     O   COMMENT ON COLUMN public.zbts_st.rlaeda IS 'Registration Date of Last Change';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.rctime    COMMENT     O   COMMENT ON COLUMN public.zbts_st.rctime IS 'Registration Time of Last Change';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.raenam    COMMENT     ]   COMMENT ON COLUMN public.zbts_st.raenam IS 'Registration Name of person who changed object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.lifnr    COMMENT     H   COMMENT ON COLUMN public.zbts_st.lifnr IS 'Account Number of Supplier';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.zvbno    COMMENT     @   COMMENT ON COLUMN public.zbts_st.zvbno IS 'Vendor Bill Number';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.ven_bill_date    COMMENT     F   COMMENT ON COLUMN public.zbts_st.ven_bill_date IS 'Vendor Bill Date';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.ebeln    COMMENT     H   COMMENT ON COLUMN public.zbts_st.ebeln IS 'Purchasing Document Number';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.dpernr1    COMMENT     A   COMMENT ON COLUMN public.zbts_st.dpernr1 IS 'Department MAN No';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drerdat1    COMMENT     N   COMMENT ON COLUMN public.zbts_st.drerdat1 IS 'Department Receive Created on';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drerzet1    COMMENT     O   COMMENT ON COLUMN public.zbts_st.drerzet1 IS 'Department Received Entry Time';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drernam1    COMMENT     b   COMMENT ON COLUMN public.zbts_st.drernam1 IS 'Department Received Person who Created the object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.dpernr2    COMMENT     J   COMMENT ON COLUMN public.zbts_st.dpernr2 IS 'Previous Department MAN No';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drerdat2    COMMENT     X   COMMENT ON COLUMN public.zbts_st.drerdat2 IS 'Previous Department Received Created on';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drerzet2    COMMENT     X   COMMENT ON COLUMN public.zbts_st.drerzet2 IS 'Previous Department Received Entry Time';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.drernam2    COMMENT     g   COMMENT ON COLUMN public.zbts_st.drernam2 IS 'Previous Department Received Person who created object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.daerdat    COMMENT     N   COMMENT ON COLUMN public.zbts_st.daerdat IS 'Department Approval Created On';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.daerzet    COMMENT     N   COMMENT ON COLUMN public.zbts_st.daerzet IS 'Department Approval Entry Time';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.daernam    COMMENT     i   COMMENT ON COLUMN public.zbts_st.daernam IS 'Department Approval Name of Person Who Created the Object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.dalaeda    COMMENT     W   COMMENT ON COLUMN public.zbts_st.dalaeda IS 'Department Approval Date of Last Change';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.daaenam    COMMENT     e   COMMENT ON COLUMN public.zbts_st.daaenam IS 'Department Approval Name of person who changed object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.deerdat    COMMENT     F   COMMENT ON COLUMN public.zbts_st.deerdat IS 'Department Rejected On';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.deerzet    COMMENT     N   COMMENT ON COLUMN public.zbts_st.deerzet IS 'Department Rejected Entry Time';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.deernam    COMMENT     i   COMMENT ON COLUMN public.zbts_st.deernam IS 'Department Rejected Name of Person Who Created the Object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.delaeda    COMMENT     W   COMMENT ON COLUMN public.zbts_st.delaeda IS 'Department Rejected Date of Last Change';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.deaenam    COMMENT     e   COMMENT ON COLUMN public.zbts_st.deaenam IS 'Department Rejected Name of person who changed object';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.dferdat    COMMENT     M   COMMENT ON COLUMN public.zbts_st.dferdat IS 'Department Forward Created On';
          public          postgres    false    298            �           0    0    COLUMN zbts_st.dferzet    COMMENT     M   COMMENT ON COLUMN public.zbts_st.dferzet IS 'Department Forward Entry Time';
          public          postgres    false    298                        0    0    COLUMN zbts_st.dfernam    COMMENT     h   COMMENT ON COLUMN public.zbts_st.dfernam IS 'Department Forward Name of Person Who Created the Object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.dflaeda    COMMENT     P   COMMENT ON COLUMN public.zbts_st.dflaeda IS 'Dept Forward Date of Last Change';
          public          postgres    false    298                       0    0    COLUMN zbts_st.dfaenam    COMMENT     d   COMMENT ON COLUMN public.zbts_st.dfaenam IS 'Department Forward Name of person who changed object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.zrmk1    COMMENT     Q   COMMENT ON COLUMN public.zbts_st.zrmk1 IS 'Remarks of Vendor Bill Registration';
          public          postgres    false    298                       0    0    COLUMN zbts_st.dstatus    COMMENT     A   COMMENT ON COLUMN public.zbts_st.dstatus IS 'Department Status';
          public          postgres    false    298                       0    0    COLUMN zbts_st.fpernr1    COMMENT     H   COMMENT ON COLUMN public.zbts_st.fpernr1 IS 'Forwarded Finance MAN No';
          public          postgres    false    298                       0    0    COLUMN zbts_st.zrmk2    COMMENT     C   COMMENT ON COLUMN public.zbts_st.zrmk2 IS 'Remarks of Department';
          public          postgres    false    298                       0    0    COLUMN zbts_st.fpernr2    COMMENT     P   COMMENT ON COLUMN public.zbts_st.fpernr2 IS 'Forwarded Banking Section MAN No';
          public          postgres    false    298                       0    0    COLUMN zbts_st.zdcomment    COMMENT     D   COMMENT ON COLUMN public.zbts_st.zdcomment IS 'Department Comment';
          public          postgres    false    298            	           0    0    COLUMN zbts_st.zrmk3    COMMENT     E   COMMENT ON COLUMN public.zbts_st.zrmk3 IS 'Remarks of Finance Dept';
          public          postgres    false    298            
           0    0    COLUMN zbts_st.zrmk4    COMMENT     H   COMMENT ON COLUMN public.zbts_st.zrmk4 IS 'Remarks of Banking Section';
          public          postgres    false    298                       0    0    COLUMN zbts_st.zfcomment    COMMENT     G   COMMENT ON COLUMN public.zbts_st.zfcomment IS 'Finance Dept Comments';
          public          postgres    false    298                       0    0    COLUMN zbts_st.fstatus    COMMENT     >   COMMENT ON COLUMN public.zbts_st.fstatus IS 'Finance Status';
          public          postgres    false    298                       0    0    COLUMN zbts_st.bstatus    COMMENT     F   COMMENT ON COLUMN public.zbts_st.bstatus IS 'Banking Section Status';
          public          postgres    false    298                       0    0    COLUMN zbts_st.unitno    COMMENT     ?   COMMENT ON COLUMN public.zbts_st.unitno IS 'GRSE Unit Number';
          public          postgres    false    298                       0    0    COLUMN zbts_st.comno    COMMENT     C   COMMENT ON COLUMN public.zbts_st.comno IS 'Computer No per Plant';
          public          postgres    false    298                       0    0    COLUMN zbts_st.frerdat    COMMENT     J   COMMENT ON COLUMN public.zbts_st.frerdat IS 'Finance Receive Created On';
          public          postgres    false    298                       0    0    COLUMN zbts_st.frerzet    COMMENT     J   COMMENT ON COLUMN public.zbts_st.frerzet IS 'Finance Receive Entry Time';
          public          postgres    false    298                       0    0    COLUMN zbts_st.frernam    COMMENT     e   COMMENT ON COLUMN public.zbts_st.frernam IS 'Finance Receive Name of Person Who Created the Object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.frlaeda    COMMENT     S   COMMENT ON COLUMN public.zbts_st.frlaeda IS 'Finance Receive Date of Last Change';
          public          postgres    false    298                       0    0    COLUMN zbts_st.fraenam    COMMENT     a   COMMENT ON COLUMN public.zbts_st.fraenam IS 'Finance Receive Name of person who changed object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.faerdat    COMMENT     K   COMMENT ON COLUMN public.zbts_st.faerdat IS 'Finance Approval Created On';
          public          postgres    false    298                       0    0    COLUMN zbts_st.faerzet    COMMENT     K   COMMENT ON COLUMN public.zbts_st.faerzet IS 'Finance Approval Entry Time';
          public          postgres    false    298                       0    0    COLUMN zbts_st.faernam    COMMENT     f   COMMENT ON COLUMN public.zbts_st.faernam IS 'Finance Approval Name of Person Who Created the Object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.falaeda    COMMENT     T   COMMENT ON COLUMN public.zbts_st.falaeda IS 'Finance Approval Date of Last Change';
          public          postgres    false    298                       0    0    COLUMN zbts_st.faaenam    COMMENT     b   COMMENT ON COLUMN public.zbts_st.faaenam IS 'Finance Approval Name of person who changed object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.feerdat    COMMENT     C   COMMENT ON COLUMN public.zbts_st.feerdat IS 'Finance Rejected On';
          public          postgres    false    298                       0    0    COLUMN zbts_st.feerzet    COMMENT     E   COMMENT ON COLUMN public.zbts_st.feerzet IS 'Finance Rejected Time';
          public          postgres    false    298                       0    0    COLUMN zbts_st.feernam    COMMENT     f   COMMENT ON COLUMN public.zbts_st.feernam IS 'Finance Rejected Name of Person Who Created the Object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.felaeda    COMMENT     T   COMMENT ON COLUMN public.zbts_st.felaeda IS 'Finance Rejected Date of Last Change';
          public          postgres    false    298                       0    0    COLUMN zbts_st.feaenam    COMMENT     b   COMMENT ON COLUMN public.zbts_st.feaenam IS 'Finance Rejected Name of person who changed object';
          public          postgres    false    298                       0    0    COLUMN zbts_st.fperdat    COMMENT     J   COMMENT ON COLUMN public.zbts_st.fperdat IS 'Finance Forward Created On';
          public          postgres    false    298                        0    0    COLUMN zbts_st.fperzet    COMMENT     J   COMMENT ON COLUMN public.zbts_st.fperzet IS 'Finance Forward Entry Time';
          public          postgres    false    298            !           0    0    COLUMN zbts_st.fpernam    COMMENT     e   COMMENT ON COLUMN public.zbts_st.fpernam IS 'Finance Forward Name of Person Who Created the Object';
          public          postgres    false    298            "           0    0    COLUMN zbts_st.fplaeda    COMMENT     S   COMMENT ON COLUMN public.zbts_st.fplaeda IS 'Finance Forward Date of Last Change';
          public          postgres    false    298            #           0    0    COLUMN zbts_st.fpaenam    COMMENT     a   COMMENT ON COLUMN public.zbts_st.fpaenam IS 'Finance Payment Name of person who changed object';
          public          postgres    false    298            $           0    0    COLUMN zbts_st.bperdat    COMMENT     R   COMMENT ON COLUMN public.zbts_st.bperdat IS 'Banking Section Payment Created on';
          public          postgres    false    298            %           0    0    COLUMN zbts_st.bperzet    COMMENT     R   COMMENT ON COLUMN public.zbts_st.bperzet IS 'Banking Section Payment Entry Time';
          public          postgres    false    298            &           0    0    COLUMN zbts_st.bpernam    COMMENT     ^   COMMENT ON COLUMN public.zbts_st.bpernam IS 'Banking Section Payment who created the object';
          public          postgres    false    298            '           0    0    COLUMN zbts_st.bplaeda    COMMENT     [   COMMENT ON COLUMN public.zbts_st.bplaeda IS 'Banking Section Payment Date of Last Change';
          public          postgres    false    298            (           0    0    COLUMN zbts_st.bpaenam    COMMENT     V   COMMENT ON COLUMN public.zbts_st.bpaenam IS 'Banking Section Payment Changed Person';
          public          postgres    false    298            )           0    0    COLUMN zbts_st.hold    COMMENT     5   COMMENT ON COLUMN public.zbts_st.hold IS 'BTS Hold';
          public          postgres    false    298            *           0    0    COLUMN zbts_st.alert_gm    COMMENT     @   COMMENT ON COLUMN public.zbts_st.alert_gm IS 'Alert Status GM';
          public          postgres    false    298            +           0    0    COLUMN zbts_st.alert_dir    COMMENT     B   COMMENT ON COLUMN public.zbts_st.alert_dir IS 'Alert Status DIR';
          public          postgres    false    298            ,           0    0    COLUMN zbts_st.alert_agm_dgm    COMMENT     L   COMMENT ON COLUMN public.zbts_st.alert_agm_dgm IS 'Alert Status AGM / DGM';
          public          postgres    false    298            +           1259    50615    zbtsm_st    TABLE       CREATE TABLE public.zbtsm_st (
    zbtno character varying(11) NOT NULL,
    srno character varying(2) NOT NULL,
    manno integer,
    zsection character varying(1) DEFAULT NULL::character varying,
    rmk character varying(140) DEFAULT NULL::character varying,
    erdat date,
    erzet time without time zone,
    ernam character varying(12) DEFAULT NULL::character varying,
    dretseq character varying(1) DEFAULT NULL::character varying,
    alert_status character varying(1) DEFAULT NULL::character varying
);
    DROP TABLE public.zbtsm_st;
       public         heap    postgres    false            -           0    0    COLUMN zbtsm_st.zbtno    COMMENT     C   COMMENT ON COLUMN public.zbtsm_st.zbtno IS 'Bill Tracking Number';
          public          postgres    false    299            .           0    0    COLUMN zbtsm_st.srno    COMMENT     7   COMMENT ON COLUMN public.zbtsm_st.srno IS 'Serial No';
          public          postgres    false    299            /           0    0    COLUMN zbtsm_st.manno    COMMENT     :   COMMENT ON COLUMN public.zbtsm_st.manno IS 'GRSE MAN NO';
          public          postgres    false    299            0           0    0    COLUMN zbtsm_st.zsection    COMMENT     B   COMMENT ON COLUMN public.zbtsm_st.zsection IS 'GRSE BTS SECTION';
          public          postgres    false    299            1           0    0    COLUMN zbtsm_st.rmk    COMMENT     4   COMMENT ON COLUMN public.zbtsm_st.rmk IS 'Remarks';
          public          postgres    false    299            2           0    0    COLUMN zbtsm_st.erdat    COMMENT     O   COMMENT ON COLUMN public.zbtsm_st.erdat IS 'Date on Which Record Was Created';
          public          postgres    false    299            3           0    0    COLUMN zbtsm_st.erzet    COMMENT     9   COMMENT ON COLUMN public.zbtsm_st.erzet IS 'Entry time';
          public          postgres    false    299            4           0    0    COLUMN zbtsm_st.ernam    COMMENT     a   COMMENT ON COLUMN public.zbtsm_st.ernam IS 'Name of Person Responsible for Creating the Object';
          public          postgres    false    299            5           0    0    COLUMN zbtsm_st.dretseq    COMMENT     K   COMMENT ON COLUMN public.zbtsm_st.dretseq IS 'Department Return Sequence';
          public          postgres    false    299            6           0    0    COLUMN zbtsm_st.alert_status    COMMENT     L   COMMENT ON COLUMN public.zbtsm_st.alert_status IS 'BTS Email Alert Status';
          public          postgres    false    299            ,           1259    50623 	   zfi_bgm_1    TABLE       CREATE TABLE public.zfi_bgm_1 (
    file_no character varying(10) NOT NULL,
    ref_no character varying(30) NOT NULL,
    bankers_name character varying(40) DEFAULT NULL::character varying,
    bankers_branch character varying(40) DEFAULT NULL::character varying,
    bankers_add1 character varying(40) DEFAULT NULL::character varying,
    bankers_add2 character varying(40) DEFAULT NULL::character varying,
    bankers_add3 character varying(40) DEFAULT NULL::character varying,
    bankers_city character varying(20) DEFAULT NULL::character varying,
    b_pin_code integer,
    bank_gu_no character varying(20) DEFAULT NULL::character varying,
    bg_date date,
    bg_amount character varying(13) DEFAULT NULL::character varying,
    po_number character varying(20) DEFAULT NULL::character varying,
    department character varying(8) DEFAULT NULL::character varying,
    po_date date,
    yard_no integer,
    validity_date date,
    claim_period date,
    checklist_ref character varying(15) DEFAULT NULL::character varying,
    checklist_date date,
    bg_type character varying(3) DEFAULT NULL::character varying,
    vendor_name character varying(40) DEFAULT NULL::character varying,
    vendor_add1 character varying(40) DEFAULT NULL::character varying,
    vendor_add2 character varying(40) DEFAULT NULL::character varying,
    vendor_add3 character varying(40) DEFAULT NULL::character varying,
    vendor_city character varying(20) DEFAULT NULL::character varying,
    v_pin_code integer,
    confirmation character varying(10) DEFAULT NULL::character varying,
    extention_date1 date,
    extention_date2 date,
    extention_date3 date,
    extention_date4 date,
    extention_date5 date,
    extention_date6 date,
    release_date date,
    dem_notice_date date,
    ext_letter_date date
);
    DROP TABLE public.zfi_bgm_1;
       public         heap    postgres    false            7           0    0    COLUMN zfi_bgm_1.bankers_name    COMMENT     C   COMMENT ON COLUMN public.zfi_bgm_1.bankers_name IS 'Bankers Name';
          public          postgres    false    300            8           0    0    COLUMN zfi_bgm_1.bankers_branch    COMMENT     G   COMMENT ON COLUMN public.zfi_bgm_1.bankers_branch IS 'Bankers Branch';
          public          postgres    false    300            9           0    0    COLUMN zfi_bgm_1.bankers_add1    COMMENT     G   COMMENT ON COLUMN public.zfi_bgm_1.bankers_add1 IS 'Bankers Address1';
          public          postgres    false    300            :           0    0    COLUMN zfi_bgm_1.bankers_add2    COMMENT     G   COMMENT ON COLUMN public.zfi_bgm_1.bankers_add2 IS 'Bankers Address2';
          public          postgres    false    300            ;           0    0    COLUMN zfi_bgm_1.bankers_add3    COMMENT     G   COMMENT ON COLUMN public.zfi_bgm_1.bankers_add3 IS 'Bankers Address3';
          public          postgres    false    300            <           0    0    COLUMN zfi_bgm_1.bankers_city    COMMENT     C   COMMENT ON COLUMN public.zfi_bgm_1.bankers_city IS 'Bankers City';
          public          postgres    false    300            =           0    0    COLUMN zfi_bgm_1.b_pin_code    COMMENT     =   COMMENT ON COLUMN public.zfi_bgm_1.b_pin_code IS 'Pin Code';
          public          postgres    false    300            >           0    0    COLUMN zfi_bgm_1.bank_gu_no    COMMENT     F   COMMENT ON COLUMN public.zfi_bgm_1.bank_gu_no IS 'Bank Guarantee No';
          public          postgres    false    300            ?           0    0    COLUMN zfi_bgm_1.bg_date    COMMENT     9   COMMENT ON COLUMN public.zfi_bgm_1.bg_date IS 'BG Date';
          public          postgres    false    300            @           0    0    COLUMN zfi_bgm_1.bg_amount    COMMENT     =   COMMENT ON COLUMN public.zfi_bgm_1.bg_amount IS 'BG Amount';
          public          postgres    false    300            A           0    0    COLUMN zfi_bgm_1.po_number    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.po_number IS 'Purchase Order No';
          public          postgres    false    300            B           0    0    COLUMN zfi_bgm_1.department    COMMENT     ?   COMMENT ON COLUMN public.zfi_bgm_1.department IS 'Department';
          public          postgres    false    300            C           0    0    COLUMN zfi_bgm_1.po_date    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.po_date IS 'Purchase Order Date';
          public          postgres    false    300            D           0    0    COLUMN zfi_bgm_1.yard_no    COMMENT     9   COMMENT ON COLUMN public.zfi_bgm_1.yard_no IS 'Yard No';
          public          postgres    false    300            E           0    0    COLUMN zfi_bgm_1.validity_date    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.validity_date IS 'Validity Date';
          public          postgres    false    300            F           0    0    COLUMN zfi_bgm_1.claim_period    COMMENT     C   COMMENT ON COLUMN public.zfi_bgm_1.claim_period IS 'Claim Period';
          public          postgres    false    300            G           0    0    COLUMN zfi_bgm_1.checklist_ref    COMMENT     K   COMMENT ON COLUMN public.zfi_bgm_1.checklist_ref IS 'Checklist Reference';
          public          postgres    false    300            H           0    0    COLUMN zfi_bgm_1.checklist_date    COMMENT     G   COMMENT ON COLUMN public.zfi_bgm_1.checklist_date IS 'Checklist Date';
          public          postgres    false    300            I           0    0    COLUMN zfi_bgm_1.bg_type    COMMENT     9   COMMENT ON COLUMN public.zfi_bgm_1.bg_type IS 'BG Type';
          public          postgres    false    300            J           0    0    COLUMN zfi_bgm_1.vendor_name    COMMENT     A   COMMENT ON COLUMN public.zfi_bgm_1.vendor_name IS 'Vendor Name';
          public          postgres    false    300            K           0    0    COLUMN zfi_bgm_1.vendor_add1    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.vendor_add1 IS 'Vendor Address1';
          public          postgres    false    300            L           0    0    COLUMN zfi_bgm_1.vendor_add2    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.vendor_add2 IS 'Vendor Address2';
          public          postgres    false    300            M           0    0    COLUMN zfi_bgm_1.vendor_add3    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.vendor_add3 IS 'Vendor Address3';
          public          postgres    false    300            N           0    0    COLUMN zfi_bgm_1.vendor_city    COMMENT     A   COMMENT ON COLUMN public.zfi_bgm_1.vendor_city IS 'Vendor City';
          public          postgres    false    300            O           0    0    COLUMN zfi_bgm_1.v_pin_code    COMMENT     E   COMMENT ON COLUMN public.zfi_bgm_1.v_pin_code IS 'Vendors Pin Code';
          public          postgres    false    300            P           0    0    COLUMN zfi_bgm_1.confirmation    COMMENT     C   COMMENT ON COLUMN public.zfi_bgm_1.confirmation IS 'Confirmation';
          public          postgres    false    300            Q           0    0     COLUMN zfi_bgm_1.extention_date1    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date1 IS 'Extention Date1';
          public          postgres    false    300            R           0    0     COLUMN zfi_bgm_1.extention_date2    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date2 IS 'Extention Date2';
          public          postgres    false    300            S           0    0     COLUMN zfi_bgm_1.extention_date3    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date3 IS 'Extention Date3';
          public          postgres    false    300            T           0    0     COLUMN zfi_bgm_1.extention_date4    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date4 IS 'Extention Date4';
          public          postgres    false    300            U           0    0     COLUMN zfi_bgm_1.extention_date5    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date5 IS 'Extention Date5';
          public          postgres    false    300            V           0    0     COLUMN zfi_bgm_1.extention_date6    COMMENT     I   COMMENT ON COLUMN public.zfi_bgm_1.extention_date6 IS 'Extention Date6';
          public          postgres    false    300            W           0    0    COLUMN zfi_bgm_1.release_date    COMMENT     C   COMMENT ON COLUMN public.zfi_bgm_1.release_date IS 'Release Date';
          public          postgres    false    300            X           0    0     COLUMN zfi_bgm_1.dem_notice_date    COMMENT     L   COMMENT ON COLUMN public.zfi_bgm_1.dem_notice_date IS 'Demand Notice Date';
          public          postgres    false    300            Y           0    0     COLUMN zfi_bgm_1.ext_letter_date    COMMENT     P   COMMENT ON COLUMN public.zfi_bgm_1.ext_letter_date IS ' Extention Letter Date';
          public          postgres    false    300            -           1259    50646    zmm_gate_entry_d    TABLE     �  CREATE TABLE public.zmm_gate_entry_d (
    entry_no character varying(13) NOT NULL,
    ebeln character varying(10) NOT NULL,
    ebelp integer NOT NULL,
    w_year integer NOT NULL,
    ch_qty bigint,
    matnr character varying(18) DEFAULT NULL::character varying,
    txz01 character varying(40) DEFAULT NULL::character varying,
    gross_wt bigint,
    tier_wt bigint,
    net_wt bigint,
    ch_netwt bigint,
    zqltysamp character varying(3) DEFAULT NULL::character varying,
    zunloadno character varying(10) DEFAULT NULL::character varying,
    zstrloctn character varying(4) DEFAULT NULL::character varying,
    grwtdt date,
    grwttm time(0) without time zone DEFAULT NULL::time without time zone,
    tawtdt date,
    tawttm time(0) without time zone DEFAULT NULL::time without time zone,
    zunlddt date,
    zunldtm time(0) without time zone DEFAULT NULL::time without time zone,
    zunld_in character varying(1) DEFAULT NULL::character varying,
    zunld_out character varying(1) DEFAULT NULL::character varying,
    zunlddt_out date,
    zunldtm_out time(0) without time zone DEFAULT NULL::time without time zone,
    grwtterm character varying(36) DEFAULT NULL::character varying,
    tawtterm character varying(36) DEFAULT NULL::character varying,
    unldterm character varying(36) DEFAULT NULL::character varying,
    zlastdate date,
    zlastterm character varying(36) DEFAULT NULL::character varying,
    zusname character varying(12) DEFAULT NULL::character varying,
    zreason character varying(40) DEFAULT NULL::character varying,
    migostatus character varying(1) DEFAULT NULL::character varying,
    status character varying(15) DEFAULT NULL::character varying,
    tuname character varying(30) DEFAULT NULL::character varying,
    guname character varying(30) DEFAULT NULL::character varying,
    mblnr character varying(10) DEFAULT NULL::character varying,
    vbeln_d character varying(10) DEFAULT NULL::character varying,
    flg character varying(1) DEFAULT NULL::character varying,
    batch character varying(5) DEFAULT NULL::character varying,
    menge_open bigint,
    recv_flg character varying(1) DEFAULT NULL::character varying,
    last_recv character varying(1) DEFAULT NULL::character varying,
    werks character varying(4) DEFAULT NULL::character varying,
    unuser character varying(30) DEFAULT NULL::character varying,
    ztcode character varying(20) DEFAULT NULL::character varying,
    utype character varying(10) DEFAULT NULL::character varying,
    migostat character varying(10) DEFAULT NULL::character varying,
    tkno character varying(6) DEFAULT NULL::character varying,
    gkno character varying(6) DEFAULT NULL::character varying,
    rsrem character varying(40) DEFAULT NULL::character varying,
    rsuser character varying(30) DEFAULT NULL::character varying,
    gutype character varying(10) DEFAULT NULL::character varying,
    holdid character varying(10) DEFAULT NULL::character varying,
    prch_qty bigint,
    zrmk1 character varying(40) DEFAULT NULL::character varying,
    mjahr integer,
    rstno character varying(10) DEFAULT NULL::character varying,
    uncleared_qty bigint,
    zmblnr character varying(10) DEFAULT NULL::character varying,
    vbeln character varying(10) DEFAULT NULL::character varying,
    posnr integer,
    zmjahr integer,
    zeile integer,
    invno character varying(30) DEFAULT NULL::character varying,
    inv_date date,
    created_at bigint,
    last_changed_at bigint
);
 $   DROP TABLE public.zmm_gate_entry_d;
       public         heap    postgres    false            Z           0    0     COLUMN zmm_gate_entry_d.entry_no    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_d.entry_no IS 'Gate Entry Number';
          public          postgres    false    301            [           0    0    COLUMN zmm_gate_entry_d.ebeln    COMMENT     Q   COMMENT ON COLUMN public.zmm_gate_entry_d.ebeln IS 'Purchasing Document Number';
          public          postgres    false    301            \           0    0    COLUMN zmm_gate_entry_d.ebelp    COMMENT     Y   COMMENT ON COLUMN public.zmm_gate_entry_d.ebelp IS 'Item Number of Purchasing Document';
          public          postgres    false    301            ]           0    0    COLUMN zmm_gate_entry_d.w_year    COMMENT     C   COMMENT ON COLUMN public.zmm_gate_entry_d.w_year IS 'Fiscal Year';
          public          postgres    false    301            ^           0    0    COLUMN zmm_gate_entry_d.ch_qty    COMMENT     @   COMMENT ON COLUMN public.zmm_gate_entry_d.ch_qty IS 'Quantity';
          public          postgres    false    301            _           0    0    COLUMN zmm_gate_entry_d.matnr    COMMENT     F   COMMENT ON COLUMN public.zmm_gate_entry_d.matnr IS 'Material Number';
          public          postgres    false    301            `           0    0    COLUMN zmm_gate_entry_d.txz01    COMMENT     A   COMMENT ON COLUMN public.zmm_gate_entry_d.txz01 IS 'Short Text';
          public          postgres    false    301            a           0    0     COLUMN zmm_gate_entry_d.gross_wt    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.gross_wt IS 'Quantity';
          public          postgres    false    301            b           0    0    COLUMN zmm_gate_entry_d.tier_wt    COMMENT     A   COMMENT ON COLUMN public.zmm_gate_entry_d.tier_wt IS 'Quantity';
          public          postgres    false    301            c           0    0    COLUMN zmm_gate_entry_d.net_wt    COMMENT     @   COMMENT ON COLUMN public.zmm_gate_entry_d.net_wt IS 'Quantity';
          public          postgres    false    301            d           0    0     COLUMN zmm_gate_entry_d.ch_netwt    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.ch_netwt IS 'Quantity';
          public          postgres    false    301            e           0    0 !   COLUMN zmm_gate_entry_d.zqltysamp    COMMENT     M   COMMENT ON COLUMN public.zmm_gate_entry_d.zqltysamp IS 'Qlty Sample Taken.';
          public          postgres    false    301            f           0    0 !   COLUMN zmm_gate_entry_d.zunloadno    COMMENT     J   COMMENT ON COLUMN public.zmm_gate_entry_d.zunloadno IS 'Unloading Point';
          public          postgres    false    301            g           0    0 !   COLUMN zmm_gate_entry_d.zstrloctn    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_d.zstrloctn IS 'Storage Location';
          public          postgres    false    301            h           0    0    COLUMN zmm_gate_entry_d.grwtdt    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_d.grwtdt IS 'Gate Entry No. Date';
          public          postgres    false    301            i           0    0    COLUMN zmm_gate_entry_d.grwttm    COMMENT     S   COMMENT ON COLUMN public.zmm_gate_entry_d.grwttm IS 'Time of gate entry document';
          public          postgres    false    301            j           0    0    COLUMN zmm_gate_entry_d.tawtdt    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_d.tawtdt IS 'Gate Entry No. Date';
          public          postgres    false    301            k           0    0    COLUMN zmm_gate_entry_d.tawttm    COMMENT     S   COMMENT ON COLUMN public.zmm_gate_entry_d.tawttm IS 'Time of gate entry document';
          public          postgres    false    301            l           0    0    COLUMN zmm_gate_entry_d.zunlddt    COMMENT     L   COMMENT ON COLUMN public.zmm_gate_entry_d.zunlddt IS 'Gate Entry No. Date';
          public          postgres    false    301            m           0    0    COLUMN zmm_gate_entry_d.zunldtm    COMMENT     T   COMMENT ON COLUMN public.zmm_gate_entry_d.zunldtm IS 'Time of gate entry document';
          public          postgres    false    301            n           0    0     COLUMN zmm_gate_entry_d.zunld_in    COMMENT     F   COMMENT ON COLUMN public.zmm_gate_entry_d.zunld_in IS 'General Flag';
          public          postgres    false    301            o           0    0 !   COLUMN zmm_gate_entry_d.zunld_out    COMMENT     G   COMMENT ON COLUMN public.zmm_gate_entry_d.zunld_out IS 'General Flag';
          public          postgres    false    301            p           0    0 #   COLUMN zmm_gate_entry_d.zunlddt_out    COMMENT     P   COMMENT ON COLUMN public.zmm_gate_entry_d.zunlddt_out IS 'Gate Entry No. Date';
          public          postgres    false    301            q           0    0 #   COLUMN zmm_gate_entry_d.zunldtm_out    COMMENT     X   COMMENT ON COLUMN public.zmm_gate_entry_d.zunldtm_out IS 'Time of gate entry document';
          public          postgres    false    301            r           0    0     COLUMN zmm_gate_entry_d.grwtterm    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.grwtterm IS 'Terminal';
          public          postgres    false    301            s           0    0     COLUMN zmm_gate_entry_d.tawtterm    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.tawtterm IS 'Terminal';
          public          postgres    false    301            t           0    0     COLUMN zmm_gate_entry_d.unldterm    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.unldterm IS 'Terminal';
          public          postgres    false    301            u           0    0 !   COLUMN zmm_gate_entry_d.zlastdate    COMMENT     N   COMMENT ON COLUMN public.zmm_gate_entry_d.zlastdate IS 'Gate Entry No. Date';
          public          postgres    false    301            v           0    0 !   COLUMN zmm_gate_entry_d.zlastterm    COMMENT     C   COMMENT ON COLUMN public.zmm_gate_entry_d.zlastterm IS 'Terminal';
          public          postgres    false    301            w           0    0    COLUMN zmm_gate_entry_d.zusname    COMMENT     X   COMMENT ON COLUMN public.zmm_gate_entry_d.zusname IS 'User Name in User Master Record';
          public          postgres    false    301            x           0    0    COLUMN zmm_gate_entry_d.zreason    COMMENT     P   COMMENT ON COLUMN public.zmm_gate_entry_d.zreason IS 'Reason for Modification';
          public          postgres    false    301            y           0    0 "   COLUMN zmm_gate_entry_d.migostatus    COMMENT     Q   COMMENT ON COLUMN public.zmm_gate_entry_d.migostatus IS 'Single-Character Flag';
          public          postgres    false    301            z           0    0    COLUMN zmm_gate_entry_d.status    COMMENT     ?   COMMENT ON COLUMN public.zmm_gate_entry_d.status IS 'Char 15';
          public          postgres    false    301            {           0    0    COLUMN zmm_gate_entry_d.tuname    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_d.tuname IS 'Name of user within the company';
          public          postgres    false    301            |           0    0    COLUMN zmm_gate_entry_d.guname    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_d.guname IS 'Name of user within the company';
          public          postgres    false    301            }           0    0    COLUMN zmm_gate_entry_d.mblnr    COMMENT     R   COMMENT ON COLUMN public.zmm_gate_entry_d.mblnr IS 'Number of Material Document';
          public          postgres    false    301            ~           0    0    COLUMN zmm_gate_entry_d.vbeln_d    COMMENT     A   COMMENT ON COLUMN public.zmm_gate_entry_d.vbeln_d IS 'Delivery';
          public          postgres    false    301                       0    0    COLUMN zmm_gate_entry_d.flg    COMMENT     A   COMMENT ON COLUMN public.zmm_gate_entry_d.flg IS 'General Flag';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.batch    COMMENT     A   COMMENT ON COLUMN public.zmm_gate_entry_d.batch IS 'Batch Flag';
          public          postgres    false    301            �           0    0 "   COLUMN zmm_gate_entry_d.menge_open    COMMENT     D   COMMENT ON COLUMN public.zmm_gate_entry_d.menge_open IS 'Quantity';
          public          postgres    false    301            �           0    0     COLUMN zmm_gate_entry_d.recv_flg    COMMENT     F   COMMENT ON COLUMN public.zmm_gate_entry_d.recv_flg IS 'General Flag';
          public          postgres    false    301            �           0    0 !   COLUMN zmm_gate_entry_d.last_recv    COMMENT     M   COMMENT ON COLUMN public.zmm_gate_entry_d.last_recv IS 'Last Unloaded item';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.werks    COMMENT     <   COMMENT ON COLUMN public.zmm_gate_entry_d.werks IS 'Plant';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.unuser    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_d.unuser IS 'Name of user within the company';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.ztcode    COMMENT     H   COMMENT ON COLUMN public.zmm_gate_entry_d.ztcode IS 'Transaction Code';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.utype    COMMENT     E   COMMENT ON COLUMN public.zmm_gate_entry_d.utype IS 'Tare User Type';
          public          postgres    false    301            �           0    0     COLUMN zmm_gate_entry_d.migostat    COMMENT     E   COMMENT ON COLUMN public.zmm_gate_entry_d.migostat IS 'Migo Status';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.tkno    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.tkno IS 'Tare KantaNo';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.gkno    COMMENT     C   COMMENT ON COLUMN public.zmm_gate_entry_d.gkno IS 'Gross KantaNo';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.rsrem    COMMENT     >   COMMENT ON COLUMN public.zmm_gate_entry_d.rsrem IS 'Remarks';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.rsuser    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_d.rsuser IS 'Name of user within the company';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.gutype    COMMENT     G   COMMENT ON COLUMN public.zmm_gate_entry_d.gutype IS 'Gross User Type';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.holdid    COMMENT     G   COMMENT ON COLUMN public.zmm_gate_entry_d.holdid IS 'Hold Ref Number';
          public          postgres    false    301            �           0    0     COLUMN zmm_gate_entry_d.prch_qty    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_d.prch_qty IS 'Quantity';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.zrmk1    COMMENT     >   COMMENT ON COLUMN public.zmm_gate_entry_d.zrmk1 IS 'Remarks';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.mjahr    COMMENT     M   COMMENT ON COLUMN public.zmm_gate_entry_d.mjahr IS 'Material Document Year';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.rstno    COMMENT     =   COMMENT ON COLUMN public.zmm_gate_entry_d.rstno IS 'RST NO';
          public          postgres    false    301            �           0    0 %   COLUMN zmm_gate_entry_d.uncleared_qty    COMMENT     G   COMMENT ON COLUMN public.zmm_gate_entry_d.uncleared_qty IS 'Quantity';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.zmblnr    COMMENT     S   COMMENT ON COLUMN public.zmm_gate_entry_d.zmblnr IS 'Number of Material Document';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.vbeln    COMMENT     ?   COMMENT ON COLUMN public.zmm_gate_entry_d.vbeln IS 'Delivery';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.posnr    COMMENT     D   COMMENT ON COLUMN public.zmm_gate_entry_d.posnr IS 'Delivery Item';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.zmjahr    COMMENT     N   COMMENT ON COLUMN public.zmm_gate_entry_d.zmjahr IS 'Material Document Year';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.zeile    COMMENT     P   COMMENT ON COLUMN public.zmm_gate_entry_d.zeile IS 'Item in Material Document';
          public          postgres    false    301            �           0    0    COLUMN zmm_gate_entry_d.invno    COMMENT     E   COMMENT ON COLUMN public.zmm_gate_entry_d.invno IS 'Invoice number';
          public          postgres    false    301            �           0    0     COLUMN zmm_gate_entry_d.inv_date    COMMENT     F   COMMENT ON COLUMN public.zmm_gate_entry_d.inv_date IS 'Incoice date';
          public          postgres    false    301            �           0    0 "   COLUMN zmm_gate_entry_d.created_at    COMMENT     H   COMMENT ON COLUMN public.zmm_gate_entry_d.created_at IS 'Created time';
          public          postgres    false    301            �           0    0 '   COLUMN zmm_gate_entry_d.last_changed_at    COMMENT     Q   COMMENT ON COLUMN public.zmm_gate_entry_d.last_changed_at IS 'Last change time';
          public          postgres    false    301            .           1259    50694    zmm_gate_entry_h    TABLE     1  CREATE TABLE public.zmm_gate_entry_h (
    entry_no character varying(13) NOT NULL,
    w_year integer NOT NULL,
    entry_date date,
    entry_time time(0) without time zone DEFAULT NULL::time without time zone,
    chalan_no character varying(40) DEFAULT NULL::character varying,
    chalan_date date,
    deliv_no character varying(12) DEFAULT NULL::character varying,
    deliv_date date,
    trans_no character varying(10) DEFAULT NULL::character varying,
    tran_name character varying(40) DEFAULT NULL::character varying,
    veh_reg_no character varying(12) DEFAULT NULL::character varying,
    lr_no character varying(20) DEFAULT NULL::character varying,
    lr_date date,
    exnum character varying(10) DEFAULT NULL::character varying,
    exdat date,
    created_at bigint,
    last_changed_at bigint
);
 $   DROP TABLE public.zmm_gate_entry_h;
       public         heap    postgres    false            �           0    0     COLUMN zmm_gate_entry_h.entry_no    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_h.entry_no IS 'Gate Entry Number';
          public          postgres    false    302            �           0    0    COLUMN zmm_gate_entry_h.w_year    COMMENT     C   COMMENT ON COLUMN public.zmm_gate_entry_h.w_year IS 'Fiscal Year';
          public          postgres    false    302            �           0    0 "   COLUMN zmm_gate_entry_h.entry_date    COMMENT     O   COMMENT ON COLUMN public.zmm_gate_entry_h.entry_date IS 'Gate Entry No. Date';
          public          postgres    false    302            �           0    0 "   COLUMN zmm_gate_entry_h.entry_time    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_h.entry_time IS 'Time of gate entry document';
          public          postgres    false    302            �           0    0 !   COLUMN zmm_gate_entry_h.chalan_no    COMMENT     H   COMMENT ON COLUMN public.zmm_gate_entry_h.chalan_no IS 'Chalan number';
          public          postgres    false    302            �           0    0 #   COLUMN zmm_gate_entry_h.chalan_date    COMMENT     I   COMMENT ON COLUMN public.zmm_gate_entry_h.chalan_date IS 'Challan date';
          public          postgres    false    302            �           0    0     COLUMN zmm_gate_entry_h.deliv_no    COMMENT     L   COMMENT ON COLUMN public.zmm_gate_entry_h.deliv_no IS 'Delivery order no.';
          public          postgres    false    302            �           0    0 "   COLUMN zmm_gate_entry_h.deliv_date    COMMENT     O   COMMENT ON COLUMN public.zmm_gate_entry_h.deliv_date IS 'Delivery order date';
          public          postgres    false    302            �           0    0     COLUMN zmm_gate_entry_h.trans_no    COMMENT     T   COMMENT ON COLUMN public.zmm_gate_entry_h.trans_no IS 'Account Number of Supplier';
          public          postgres    false    302            �           0    0 !   COLUMN zmm_gate_entry_h.tran_name    COMMENT     R   COMMENT ON COLUMN public.zmm_gate_entry_h.tran_name IS 'Transporter vendor name';
          public          postgres    false    302            �           0    0 "   COLUMN zmm_gate_entry_h.veh_reg_no    COMMENT     W   COMMENT ON COLUMN public.zmm_gate_entry_h.veh_reg_no IS 'Vehicle registration number';
          public          postgres    false    302            �           0    0    COLUMN zmm_gate_entry_h.lr_no    COMMENT     >   COMMENT ON COLUMN public.zmm_gate_entry_h.lr_no IS 'L.R. no';
          public          postgres    false    302            �           0    0    COLUMN zmm_gate_entry_h.lr_date    COMMENT     B   COMMENT ON COLUMN public.zmm_gate_entry_h.lr_date IS 'L.R. date';
          public          postgres    false    302            �           0    0    COLUMN zmm_gate_entry_h.exnum    COMMENT     I   COMMENT ON COLUMN public.zmm_gate_entry_h.exnum IS 'Excise Invoice No.';
          public          postgres    false    302            �           0    0    COLUMN zmm_gate_entry_h.exdat    COMMENT     K   COMMENT ON COLUMN public.zmm_gate_entry_h.exdat IS 'Excise Document Date';
          public          postgres    false    302            �           0    0 "   COLUMN zmm_gate_entry_h.created_at    COMMENT     H   COMMENT ON COLUMN public.zmm_gate_entry_h.created_at IS 'Created time';
          public          postgres    false    302            �           0    0 '   COLUMN zmm_gate_entry_h.last_changed_at    COMMENT     Q   COMMENT ON COLUMN public.zmm_gate_entry_h.last_changed_at IS 'Last change time';
          public          postgres    false    302            /           1259    50705    zpo_milestone    TABLE     <  CREATE TABLE public.zpo_milestone (
    ebeln character varying(10) NOT NULL,
    mid character varying(3) NOT NULL,
    mtext character varying(60) DEFAULT NULL::character varying,
    plan_date date,
    mo character varying(2) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
 !   DROP TABLE public.zpo_milestone;
       public         heap    postgres    false            �           0    0    COLUMN zpo_milestone.ebeln    COMMENT     N   COMMENT ON COLUMN public.zpo_milestone.ebeln IS 'Purchasing Document Number';
          public          postgres    false    303            �           0    0    COLUMN zpo_milestone.mid    COMMENT     >   COMMENT ON COLUMN public.zpo_milestone.mid IS 'Milesotne Id';
          public          postgres    false    303            �           0    0    COLUMN zpo_milestone.plan_date    COMMENT     A   COMMENT ON COLUMN public.zpo_milestone.plan_date IS 'Plan Date';
          public          postgres    false    303            �           0    0    COLUMN zpo_milestone.mo    COMMENT     ?   COMMENT ON COLUMN public.zpo_milestone.mo IS 'Mandatory flag';
          public          postgres    false    303            �           0    0    COLUMN zpo_milestone.created_at    COMMENT     E   COMMENT ON COLUMN public.zpo_milestone.created_at IS 'Created time';
          public          postgres    false    303            �           0    0 $   COLUMN zpo_milestone.last_changed_at    COMMENT     N   COMMENT ON COLUMN public.zpo_milestone.last_changed_at IS 'Last change time';
          public          postgres    false    303            0           1259    50710    ztfi_bil_deface    TABLE     P  CREATE TABLE public.ztfi_bil_deface (
    zregnum character varying(11) NOT NULL,
    seqno integer NOT NULL,
    zbillper character varying(3) NOT NULL,
    zcreate character varying(1) DEFAULT NULL::character varying,
    zdelete character varying(1) DEFAULT NULL::character varying,
    zbilltype character varying(8) DEFAULT NULL::character varying,
    zrecord character varying(40) DEFAULT NULL::character varying,
    zregdate date,
    zpono character varying(10) DEFAULT NULL::character varying,
    zvendor character varying(10) DEFAULT NULL::character varying,
    zcreatedby character varying(12) DEFAULT NULL::character varying,
    zcreatedon date,
    zcreatedat time without time zone,
    zmodifiedby character varying(12) DEFAULT NULL::character varying,
    zmodifiedon date,
    zmodifiedat time without time zone,
    zcerwdc_s character varying(50) DEFAULT NULL::character varying,
    zcerpay_s character varying(50) DEFAULT NULL::character varying,
    zcerattndr_s character varying(50) DEFAULT NULL::character varying,
    zbgfileno_s character varying(10) DEFAULT NULL::character varying,
    zddno_s character varying(10) DEFAULT NULL::character varying,
    zbscval_m_s character varying(18) DEFAULT NULL::character varying,
    zntsupp_s character varying(18) DEFAULT NULL::character varying,
    znetvalue_s character varying(18) DEFAULT NULL::character varying,
    zcst_vat_s character varying(18) DEFAULT NULL::character varying,
    zcst_vat_txt character varying(50) DEFAULT NULL::character varying,
    ztotalb_s character varying(18) DEFAULT NULL::character varying,
    zadd_othrchrg_s character varying(18) DEFAULT NULL::character varying,
    zadd_othrchrg_txt character varying(50) DEFAULT NULL::character varying,
    zadd_othrchrg_1_s character varying(18) DEFAULT NULL::character varying,
    zadd_othrchrg_1_txt character varying(50) DEFAULT NULL::character varying,
    ztotala_s character varying(18) DEFAULT NULL::character varying,
    zblnc_paymnt_s character varying(18) DEFAULT NULL::character varying,
    zles_inctax_s character varying(18) DEFAULT NULL::character varying,
    zles_inctax_txt character varying(50) DEFAULT NULL::character varying,
    zles_retntn_s character varying(18) DEFAULT NULL::character varying,
    zles_retntn_txt character varying(50) DEFAULT NULL::character varying,
    zles_wrkcontax_s character varying(18) DEFAULT NULL::character varying,
    zles_wrkcontax_txt character varying(50) DEFAULT NULL::character varying,
    zles_ld_s character varying(18) DEFAULT NULL::character varying,
    zles_ld_txt character varying(50) DEFAULT NULL::character varying,
    zles_penalty_s character varying(18) DEFAULT NULL::character varying,
    zles_penalty_txt character varying(50) DEFAULT NULL::character varying,
    zles_sd_s character varying(18) DEFAULT NULL::character varying,
    zles_sd_txt character varying(50) DEFAULT NULL::character varying,
    zles_othr_s character varying(18) DEFAULT NULL::character varying,
    zles_othr_txt character varying(50) DEFAULT NULL::character varying,
    zles_gross_ret character varying(18) DEFAULT NULL::character varying,
    zles_gross_ded character varying(18) DEFAULT NULL::character varying,
    zles_intsd_s character varying(18) DEFAULT NULL::character varying,
    zles_intsd_txt character varying(50) DEFAULT NULL::character varying,
    zles_cstofcon_paint_s character varying(18) DEFAULT NULL::character varying,
    zles_cstofcon_paint_txt character varying(50) DEFAULT NULL::character varying,
    znet_pymnt1_s character varying(18) DEFAULT NULL::character varying,
    znet_blncpay_s character varying(18) DEFAULT NULL::character varying,
    znet_retntn_s character varying(18) DEFAULT NULL::character varying,
    znet_lesdedc_s character varying(18) DEFAULT NULL::character varying,
    znet_pymnt2_s character varying(18) DEFAULT NULL::character varying,
    zles_othrded_s character varying(50) DEFAULT NULL::character varying,
    zles_othrded_txt character varying(50) DEFAULT NULL::character varying,
    zblnc_certby_s character varying(20) DEFAULT NULL::character varying,
    zblnc_pbgfileno_s character varying(20) DEFAULT NULL::character varying,
    zblnc_othrs_s character varying(30) DEFAULT NULL::character varying,
    zld character varying(50) DEFAULT NULL::character varying,
    zobdno_m character varying(50) DEFAULT NULL::character varying,
    zcermarkt_m character varying(50) DEFAULT NULL::character varying,
    zcerinspec_m character varying(50) DEFAULT NULL::character varying,
    zcerguarntee_m character varying(50) DEFAULT NULL::character varying,
    zcercomp_m character varying(50) DEFAULT NULL::character varying,
    zilms character varying(50) DEFAULT NULL::character varying,
    zcpbgfileno_m character varying(20) DEFAULT NULL::character varying,
    zindem_bndfileno_m character varying(20) DEFAULT NULL::character varying,
    zchllnno_m character varying(30) DEFAULT NULL::character varying,
    zchllndate_m date,
    zconsignno_m character varying(30) DEFAULT NULL::character varying,
    zconsigndate_m date,
    zcarrier_m character varying(30) DEFAULT NULL::character varying,
    zactldeldate1_m date,
    zactldeldate2_m date,
    zactldeldate3_m date,
    zpaymntprocess_m date,
    reason_dedctn character varying(100) DEFAULT NULL::character varying,
    zpbgfileno_m character varying(20) DEFAULT NULL::character varying,
    zsrvno_m character varying(50) DEFAULT NULL::character varying,
    zbillno character varying(40) DEFAULT NULL::character varying,
    zbilldate date,
    zschdeldate1_s date,
    zschdeldate2_s date,
    zschdeldate3_s date,
    zdelay1 character varying(8) DEFAULT NULL::character varying,
    zdelay2 character varying(8) DEFAULT NULL::character varying,
    zdelay3 character varying(8) DEFAULT NULL::character varying,
    code_1 integer,
    code integer,
    remarks character varying(60) DEFAULT NULL::character varying,
    reference character varying(11) DEFAULT NULL::character varying,
    remarks_1 character varying(60) DEFAULT NULL::character varying,
    ten_per_amount character varying(18) DEFAULT NULL::character varying,
    comments_1 character varying(60) DEFAULT NULL::character varying,
    comments character varying(60) DEFAULT NULL::character varying,
    zten_retntn_s character varying(18) DEFAULT NULL::character varying,
    zten_lesdedc_s character varying(18) DEFAULT NULL::character varying,
    miro character varying(10) DEFAULT NULL::character varying,
    miro_date date,
    zten_processed_pymt character varying(18) DEFAULT NULL::character varying,
    ed_ec character varying(100) DEFAULT NULL::character varying,
    created_at bigint,
    last_changed_at bigint
);
 #   DROP TABLE public.ztfi_bil_deface;
       public         heap    postgres    false            �           0    0    COLUMN ztfi_bil_deface.zregnum    COMMENT     L   COMMENT ON COLUMN public.ztfi_bil_deface.zregnum IS 'Bill Tracking Number';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.seqno    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.seqno IS 'Natural number';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zbillper    COMMENT     E   COMMENT ON COLUMN public.ztfi_bil_deface.zbillper IS '3-Byte field';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zcreate    COMMENT     M   COMMENT ON COLUMN public.ztfi_bil_deface.zcreate IS 'Single-Character Flag';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zdelete    COMMENT     M   COMMENT ON COLUMN public.ztfi_bil_deface.zdelete IS 'Single-Character Flag';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zbilltype    COMMENT     \   COMMENT ON COLUMN public.ztfi_bil_deface.zbilltype IS 'Character field, 8 characters long';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zrecord    COMMENT     J   COMMENT ON COLUMN public.ztfi_bil_deface.zrecord IS 'Vendor Bill Number';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zregdate    COMMENT     K   COMMENT ON COLUMN public.ztfi_bil_deface.zregdate IS 'Field of type DATS';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zpono    COMMENT     P   COMMENT ON COLUMN public.ztfi_bil_deface.zpono IS 'Purchasing Document Number';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zvendor    COMMENT     R   COMMENT ON COLUMN public.ztfi_bil_deface.zvendor IS 'Account Number of Supplier';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zcreatedby    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.zcreatedby IS 'User Name';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zcreatedon    COMMENT     ?   COMMENT ON COLUMN public.ztfi_bil_deface.zcreatedon IS 'Date';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zcreatedat    COMMENT     M   COMMENT ON COLUMN public.ztfi_bil_deface.zcreatedat IS 'Field of type TIMS';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zmodifiedby    COMMENT     E   COMMENT ON COLUMN public.ztfi_bil_deface.zmodifiedby IS 'User Name';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zmodifiedon    COMMENT     @   COMMENT ON COLUMN public.ztfi_bil_deface.zmodifiedon IS 'Date';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zmodifiedat    COMMENT     N   COMMENT ON COLUMN public.ztfi_bil_deface.zmodifiedat IS 'Field of type TIMS';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zcerwdc_s    COMMENT     A   COMMENT ON COLUMN public.ztfi_bil_deface.zcerwdc_s IS 'Comment';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zcerpay_s    COMMENT     A   COMMENT ON COLUMN public.ztfi_bil_deface.zcerpay_s IS 'Comment';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zcerattndr_s    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.zcerattndr_s IS 'Comment';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zbgfileno_s    COMMENT     W   COMMENT ON COLUMN public.ztfi_bil_deface.zbgfileno_s IS 'Character Field Length = 10';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zddno_s    COMMENT     S   COMMENT ON COLUMN public.ztfi_bil_deface.zddno_s IS 'Character Field Length = 10';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zbscval_m_s    COMMENT     a   COMMENT ON COLUMN public.ztfi_bil_deface.zbscval_m_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zntsupp_s    COMMENT     _   COMMENT ON COLUMN public.ztfi_bil_deface.zntsupp_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.znetvalue_s    COMMENT     a   COMMENT ON COLUMN public.ztfi_bil_deface.znetvalue_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zcst_vat_s    COMMENT     `   COMMENT ON COLUMN public.ztfi_bil_deface.zcst_vat_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zcst_vat_txt    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.zcst_vat_txt IS 'Comment';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.ztotalb_s    COMMENT     _   COMMENT ON COLUMN public.ztfi_bil_deface.ztotalb_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 &   COLUMN ztfi_bil_deface.zadd_othrchrg_s    COMMENT     e   COMMENT ON COLUMN public.ztfi_bil_deface.zadd_othrchrg_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 (   COLUMN ztfi_bil_deface.zadd_othrchrg_txt    COMMENT     I   COMMENT ON COLUMN public.ztfi_bil_deface.zadd_othrchrg_txt IS 'Comment';
          public          postgres    false    304            �           0    0 (   COLUMN ztfi_bil_deface.zadd_othrchrg_1_s    COMMENT     g   COMMENT ON COLUMN public.ztfi_bil_deface.zadd_othrchrg_1_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 *   COLUMN ztfi_bil_deface.zadd_othrchrg_1_txt    COMMENT     K   COMMENT ON COLUMN public.ztfi_bil_deface.zadd_othrchrg_1_txt IS 'Comment';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.ztotala_s    COMMENT     _   COMMENT ON COLUMN public.ztfi_bil_deface.ztotala_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zblnc_paymnt_s    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.zblnc_paymnt_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.zles_inctax_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.zles_inctax_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 &   COLUMN ztfi_bil_deface.zles_inctax_txt    COMMENT     G   COMMENT ON COLUMN public.ztfi_bil_deface.zles_inctax_txt IS 'Comment';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.zles_retntn_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.zles_retntn_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 &   COLUMN ztfi_bil_deface.zles_retntn_txt    COMMENT     G   COMMENT ON COLUMN public.ztfi_bil_deface.zles_retntn_txt IS 'Comment';
          public          postgres    false    304            �           0    0 '   COLUMN ztfi_bil_deface.zles_wrkcontax_s    COMMENT     f   COMMENT ON COLUMN public.ztfi_bil_deface.zles_wrkcontax_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 )   COLUMN ztfi_bil_deface.zles_wrkcontax_txt    COMMENT     J   COMMENT ON COLUMN public.ztfi_bil_deface.zles_wrkcontax_txt IS 'Comment';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zles_ld_s    COMMENT     _   COMMENT ON COLUMN public.ztfi_bil_deface.zles_ld_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zles_ld_txt    COMMENT     C   COMMENT ON COLUMN public.ztfi_bil_deface.zles_ld_txt IS 'Comment';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zles_penalty_s    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.zles_penalty_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 '   COLUMN ztfi_bil_deface.zles_penalty_txt    COMMENT     H   COMMENT ON COLUMN public.ztfi_bil_deface.zles_penalty_txt IS 'Comment';
          public          postgres    false    304            �           0    0     COLUMN ztfi_bil_deface.zles_sd_s    COMMENT     _   COMMENT ON COLUMN public.ztfi_bil_deface.zles_sd_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zles_sd_txt    COMMENT     C   COMMENT ON COLUMN public.ztfi_bil_deface.zles_sd_txt IS 'Comment';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zles_othr_s    COMMENT     a   COMMENT ON COLUMN public.ztfi_bil_deface.zles_othr_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.zles_othr_txt    COMMENT     E   COMMENT ON COLUMN public.ztfi_bil_deface.zles_othr_txt IS 'Comment';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zles_gross_ret    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.zles_gross_ret IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zles_gross_ded    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.zles_gross_ded IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zles_intsd_s    COMMENT     b   COMMENT ON COLUMN public.ztfi_bil_deface.zles_intsd_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zles_intsd_txt    COMMENT     F   COMMENT ON COLUMN public.ztfi_bil_deface.zles_intsd_txt IS 'Comment';
          public          postgres    false    304            �           0    0 ,   COLUMN ztfi_bil_deface.zles_cstofcon_paint_s    COMMENT     k   COMMENT ON COLUMN public.ztfi_bil_deface.zles_cstofcon_paint_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 .   COLUMN ztfi_bil_deface.zles_cstofcon_paint_txt    COMMENT     O   COMMENT ON COLUMN public.ztfi_bil_deface.zles_cstofcon_paint_txt IS 'Comment';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.znet_pymnt1_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.znet_pymnt1_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.znet_blncpay_s    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.znet_blncpay_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.znet_retntn_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.znet_retntn_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.znet_lesdedc_s    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.znet_lesdedc_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.znet_pymnt2_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.znet_pymnt2_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zles_othrded_s    COMMENT     F   COMMENT ON COLUMN public.ztfi_bil_deface.zles_othrded_s IS 'Comment';
          public          postgres    false    304            �           0    0 '   COLUMN ztfi_bil_deface.zles_othrded_txt    COMMENT     H   COMMENT ON COLUMN public.ztfi_bil_deface.zles_othrded_txt IS 'Comment';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zblnc_certby_s    COMMENT     F   COMMENT ON COLUMN public.ztfi_bil_deface.zblnc_certby_s IS 'Char 20';
          public          postgres    false    304            �           0    0 (   COLUMN ztfi_bil_deface.zblnc_pbgfileno_s    COMMENT     I   COMMENT ON COLUMN public.ztfi_bil_deface.zblnc_pbgfileno_s IS 'Char 20';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.zblnc_othrs_s    COMMENT     K   COMMENT ON COLUMN public.ztfi_bil_deface.zblnc_othrs_s IS '30 Characters';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zld    COMMENT     ;   COMMENT ON COLUMN public.ztfi_bil_deface.zld IS 'Comment';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zobdno_m    COMMENT     @   COMMENT ON COLUMN public.ztfi_bil_deface.zobdno_m IS 'Comment';
          public          postgres    false    304            �           0    0 "   COLUMN ztfi_bil_deface.zcermarkt_m    COMMENT     C   COMMENT ON COLUMN public.ztfi_bil_deface.zcermarkt_m IS 'Comment';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zcerinspec_m    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.zcerinspec_m IS 'Comment';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zcerguarntee_m    COMMENT     F   COMMENT ON COLUMN public.ztfi_bil_deface.zcerguarntee_m IS 'Comment';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zcercomp_m    COMMENT     B   COMMENT ON COLUMN public.ztfi_bil_deface.zcercomp_m IS 'Comment';
          public          postgres    false    304            �           0    0    COLUMN ztfi_bil_deface.zilms    COMMENT     =   COMMENT ON COLUMN public.ztfi_bil_deface.zilms IS 'Comment';
          public          postgres    false    304            �           0    0 $   COLUMN ztfi_bil_deface.zcpbgfileno_m    COMMENT     E   COMMENT ON COLUMN public.ztfi_bil_deface.zcpbgfileno_m IS 'Char 20';
          public          postgres    false    304            �           0    0 )   COLUMN ztfi_bil_deface.zindem_bndfileno_m    COMMENT     J   COMMENT ON COLUMN public.ztfi_bil_deface.zindem_bndfileno_m IS 'Char 20';
          public          postgres    false    304            �           0    0 !   COLUMN ztfi_bil_deface.zchllnno_m    COMMENT     H   COMMENT ON COLUMN public.ztfi_bil_deface.zchllnno_m IS '30 Characters';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zchllndate_m    COMMENT     O   COMMENT ON COLUMN public.ztfi_bil_deface.zchllndate_m IS 'Field of type DATS';
          public          postgres    false    304            �           0    0 #   COLUMN ztfi_bil_deface.zconsignno_m    COMMENT     J   COMMENT ON COLUMN public.ztfi_bil_deface.zconsignno_m IS '30 Characters';
          public          postgres    false    304            �           0    0 %   COLUMN ztfi_bil_deface.zconsigndate_m    COMMENT     Q   COMMENT ON COLUMN public.ztfi_bil_deface.zconsigndate_m IS 'Field of type DATS';
          public          postgres    false    304                        0    0 !   COLUMN ztfi_bil_deface.zcarrier_m    COMMENT     H   COMMENT ON COLUMN public.ztfi_bil_deface.zcarrier_m IS '30 Characters';
          public          postgres    false    304                       0    0 &   COLUMN ztfi_bil_deface.zactldeldate1_m    COMMENT     R   COMMENT ON COLUMN public.ztfi_bil_deface.zactldeldate1_m IS 'Field of type DATS';
          public          postgres    false    304                       0    0 &   COLUMN ztfi_bil_deface.zactldeldate2_m    COMMENT     R   COMMENT ON COLUMN public.ztfi_bil_deface.zactldeldate2_m IS 'Field of type DATS';
          public          postgres    false    304                       0    0 &   COLUMN ztfi_bil_deface.zactldeldate3_m    COMMENT     R   COMMENT ON COLUMN public.ztfi_bil_deface.zactldeldate3_m IS 'Field of type DATS';
          public          postgres    false    304                       0    0 '   COLUMN ztfi_bil_deface.zpaymntprocess_m    COMMENT     S   COMMENT ON COLUMN public.ztfi_bil_deface.zpaymntprocess_m IS 'Field of type DATS';
          public          postgres    false    304                       0    0 $   COLUMN ztfi_bil_deface.reason_dedctn    COMMENT     K   COMMENT ON COLUMN public.ztfi_bil_deface.reason_dedctn IS 'Character 100';
          public          postgres    false    304                       0    0 #   COLUMN ztfi_bil_deface.zpbgfileno_m    COMMENT     D   COMMENT ON COLUMN public.ztfi_bil_deface.zpbgfileno_m IS 'Char 20';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.zsrvno_m    COMMENT     @   COMMENT ON COLUMN public.ztfi_bil_deface.zsrvno_m IS 'Comment';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.zbillno    COMMENT     J   COMMENT ON COLUMN public.ztfi_bil_deface.zbillno IS 'Vendor Bill Number';
          public          postgres    false    304            	           0    0     COLUMN ztfi_bil_deface.zbilldate    COMMENT     L   COMMENT ON COLUMN public.ztfi_bil_deface.zbilldate IS 'Field of type DATS';
          public          postgres    false    304            
           0    0 %   COLUMN ztfi_bil_deface.zschdeldate1_s    COMMENT     Q   COMMENT ON COLUMN public.ztfi_bil_deface.zschdeldate1_s IS 'Field of type DATS';
          public          postgres    false    304                       0    0 %   COLUMN ztfi_bil_deface.zschdeldate2_s    COMMENT     Q   COMMENT ON COLUMN public.ztfi_bil_deface.zschdeldate2_s IS 'Field of type DATS';
          public          postgres    false    304                       0    0 %   COLUMN ztfi_bil_deface.zschdeldate3_s    COMMENT     Q   COMMENT ON COLUMN public.ztfi_bil_deface.zschdeldate3_s IS 'Field of type DATS';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.zdelay1    COMMENT     Z   COMMENT ON COLUMN public.ztfi_bil_deface.zdelay1 IS 'Character field, 8 characters long';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.zdelay2    COMMENT     Z   COMMENT ON COLUMN public.ztfi_bil_deface.zdelay2 IS 'Character field, 8 characters long';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.zdelay3    COMMENT     Z   COMMENT ON COLUMN public.ztfi_bil_deface.zdelay3 IS 'Character field, 8 characters long';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.code_1    COMMENT     R   COMMENT ON COLUMN public.ztfi_bil_deface.code_1 IS 'Vendor Payment remarks code';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.code    COMMENT     P   COMMENT ON COLUMN public.ztfi_bil_deface.code IS 'Vendor Payment remarks code';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.remarks    COMMENT     ?   COMMENT ON COLUMN public.ztfi_bil_deface.remarks IS 'Remarks';
          public          postgres    false    304                       0    0     COLUMN ztfi_bil_deface.reference    COMMENT     N   COMMENT ON COLUMN public.ztfi_bil_deface.reference IS 'Bill Tracking Number';
          public          postgres    false    304                       0    0     COLUMN ztfi_bil_deface.remarks_1    COMMENT     A   COMMENT ON COLUMN public.ztfi_bil_deface.remarks_1 IS 'Remarks';
          public          postgres    false    304                       0    0 %   COLUMN ztfi_bil_deface.ten_per_amount    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.ten_per_amount IS 'Rate (condition amount or percentage)';
          public          postgres    false    304                       0    0 !   COLUMN ztfi_bil_deface.comments_1    COMMENT     B   COMMENT ON COLUMN public.ztfi_bil_deface.comments_1 IS 'Remarks';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.comments    COMMENT     @   COMMENT ON COLUMN public.ztfi_bil_deface.comments IS 'Remarks';
          public          postgres    false    304                       0    0 $   COLUMN ztfi_bil_deface.zten_retntn_s    COMMENT     c   COMMENT ON COLUMN public.ztfi_bil_deface.zten_retntn_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304                       0    0 %   COLUMN ztfi_bil_deface.zten_lesdedc_s    COMMENT     d   COMMENT ON COLUMN public.ztfi_bil_deface.zten_lesdedc_s IS 'Rate (condition amount or percentage)';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.miro    COMMENT     P   COMMENT ON COLUMN public.ztfi_bil_deface.miro IS 'Character Field Length = 10';
          public          postgres    false    304                       0    0     COLUMN ztfi_bil_deface.miro_date    COMMENT     L   COMMENT ON COLUMN public.ztfi_bil_deface.miro_date IS 'Field of type DATS';
          public          postgres    false    304                       0    0 *   COLUMN ztfi_bil_deface.zten_processed_pymt    COMMENT     i   COMMENT ON COLUMN public.ztfi_bil_deface.zten_processed_pymt IS 'Rate (condition amount or percentage)';
          public          postgres    false    304                       0    0    COLUMN ztfi_bil_deface.ed_ec    COMMENT     C   COMMENT ON COLUMN public.ztfi_bil_deface.ed_ec IS 'Character 100';
          public          postgres    false    304            '           2604    50800    actualsubmissiondate id    DEFAULT     �   ALTER TABLE ONLY public.actualsubmissiondate ALTER COLUMN id SET DEFAULT nextval('public.actualsubmissiondate_id_seq'::regclass);
 F   ALTER TABLE public.actualsubmissiondate ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            (           2604    50801    auth id    DEFAULT     b   ALTER TABLE ONLY public.auth ALTER COLUMN id SET DEFAULT nextval('public.auth_id_seq'::regclass);
 6   ALTER TABLE public.auth ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            e           2604    50802    demande_management id    DEFAULT     ~   ALTER TABLE ONLY public.demande_management ALTER COLUMN id SET DEFAULT nextval('public.demande_management_id_seq'::regclass);
 D   ALTER TABLE public.demande_management ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            h           2604    50803    department_wise_log id    DEFAULT     �   ALTER TABLE ONLY public.department_wise_log ALTER COLUMN id SET DEFAULT nextval('public.department_wise_log_id_seq'::regclass);
 E   ALTER TABLE public.department_wise_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            m           2604    50804    depertment_master id    DEFAULT     |   ALTER TABLE ONLY public.depertment_master ALTER COLUMN id SET DEFAULT nextval('public.depertment_master_id_seq'::regclass);
 C   ALTER TABLE public.depertment_master ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            n           2604    50805 
   drawing id    DEFAULT     h   ALTER TABLE ONLY public.drawing ALTER COLUMN id SET DEFAULT nextval('public.drawing_id_seq'::regclass);
 9   ALTER TABLE public.drawing ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    50806    emp_department_list id    DEFAULT     �   ALTER TABLE ONLY public.emp_department_list ALTER COLUMN id SET DEFAULT nextval('public.emp_department_list_id_seq'::regclass);
 E   ALTER TABLE public.emp_department_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    50807    generic_log id    DEFAULT     p   ALTER TABLE ONLY public.generic_log ALTER COLUMN id SET DEFAULT nextval('public.generic_log_id_seq'::regclass);
 =   ALTER TABLE public.generic_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236            �           2604    50808    hr id    DEFAULT     ^   ALTER TABLE ONLY public.hr ALTER COLUMN id SET DEFAULT nextval('public.hr_id_seq'::regclass);
 4   ALTER TABLE public.hr ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    238            �           2604    50809    hr_compliance id    DEFAULT     t   ALTER TABLE ONLY public.hr_compliance ALTER COLUMN id SET DEFAULT nextval('public.hr_compliance_id_seq'::regclass);
 ?   ALTER TABLE public.hr_compliance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239            �           2604    50810    icgrn id    DEFAULT     d   ALTER TABLE ONLY public.icgrn ALTER COLUMN id SET DEFAULT nextval('public.icgrn_id_seq'::regclass);
 7   ALTER TABLE public.icgrn ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    242            �           2604    50811    ilms id    DEFAULT     b   ALTER TABLE ONLY public.ilms ALTER COLUMN id SET DEFAULT nextval('public.ilms_id_seq'::regclass);
 6   ALTER TABLE public.ilms ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    244            �           2604    50812    inspection_call_letter id    DEFAULT     �   ALTER TABLE ONLY public.inspection_call_letter ALTER COLUMN id SET DEFAULT nextval('public.inspection_call_letter_id_seq'::regclass);
 H   ALTER TABLE public.inspection_call_letter ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246            �           2604    50813    inspection_release_note id    DEFAULT     �   ALTER TABLE ONLY public.inspection_release_note ALTER COLUMN id SET DEFAULT nextval('public.inspection_release_note_id_seq'::regclass);
 I   ALTER TABLE public.inspection_release_note ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            �           2604    50814    internal_role_master id    DEFAULT     �   ALTER TABLE ONLY public.internal_role_master ALTER COLUMN id SET DEFAULT nextval('public.internal_role_master_id_seq'::regclass);
 F   ALTER TABLE public.internal_role_master ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250            �           2604    50815    material_type id    DEFAULT     t   ALTER TABLE ONLY public.material_type ALTER COLUMN id SET DEFAULT nextval('public.material_type_id_seq'::regclass);
 ?   ALTER TABLE public.material_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            �           2604    50816    mrs id    DEFAULT     `   ALTER TABLE ONLY public.mrs ALTER COLUMN id SET DEFAULT nextval('public.mrs_id_seq'::regclass);
 5   ALTER TABLE public.mrs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    259    258            =           2604    50817    ppc_wbs_project_code id    DEFAULT     �   ALTER TABLE ONLY public.ppc_wbs_project_code ALTER COLUMN id SET DEFAULT nextval('public.ppc_wbs_project_code_id_seq'::regclass);
 F   ALTER TABLE public.ppc_wbs_project_code ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262            >           2604    50818    privilege id    DEFAULT     l   ALTER TABLE ONLY public.privilege ALTER COLUMN id SET DEFAULT nextval('public.privilege_id_seq'::regclass);
 ;   ALTER TABLE public.privilege ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    265    264            �           2604    50819    qap_save id    DEFAULT     j   ALTER TABLE ONLY public.qap_save ALTER COLUMN id SET DEFAULT nextval('public.qap_save_id_seq'::regclass);
 :   ALTER TABLE public.qap_save ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267            �           2604    50820    qap_submission id    DEFAULT     v   ALTER TABLE ONLY public.qap_submission ALTER COLUMN id SET DEFAULT nextval('public.qap_submission_id_seq'::regclass);
 @   ALTER TABLE public.qap_submission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            �           2604    50821    sdbg id    DEFAULT     b   ALTER TABLE ONLY public.sdbg ALTER COLUMN id SET DEFAULT nextval('public.sdbg_id_seq'::regclass);
 6   ALTER TABLE public.sdbg ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    277    274            �           2604    50822    sdbg_entry id    DEFAULT     n   ALTER TABLE ONLY public.sdbg_entry ALTER COLUMN id SET DEFAULT nextval('public.sdbg_entry_id_seq'::regclass);
 <   ALTER TABLE public.sdbg_entry ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    276    275            �           2604    50823    shipping_documents id    DEFAULT     ~   ALTER TABLE ONLY public.shipping_documents ALTER COLUMN id SET DEFAULT nextval('public.shipping_documents_id_seq'::regclass);
 D   ALTER TABLE public.shipping_documents ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    279    278            �           2604    50824    store_grn id    DEFAULT     l   ALTER TABLE ONLY public.store_grn ALTER COLUMN id SET DEFAULT nextval('public.store_grn_id_seq'::regclass);
 ;   ALTER TABLE public.store_grn ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    282    281            �           2604    50825    store_icgrn id    DEFAULT     p   ALTER TABLE ONLY public.store_icgrn ALTER COLUMN id SET DEFAULT nextval('public.store_icgrn_id_seq'::regclass);
 =   ALTER TABLE public.store_icgrn ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    284    283            �           2604    50826    sub_dept id    DEFAULT     j   ALTER TABLE ONLY public.sub_dept ALTER COLUMN id SET DEFAULT nextval('public.sub_dept_id_seq'::regclass);
 :   ALTER TABLE public.sub_dept ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    286    285            �           2604    57361    t_email_to_send id    DEFAULT     x   ALTER TABLE ONLY public.t_email_to_send ALTER COLUMN id SET DEFAULT nextval('public.t_email_to_send_id_seq'::regclass);
 A   ALTER TABLE public.t_email_to_send ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    307    308    308            �           2604    50827    test id    DEFAULT     b   ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);
 6   ALTER TABLE public.test ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            �           2604    50828    tnc_minutes id    DEFAULT     p   ALTER TABLE ONLY public.tnc_minutes ALTER COLUMN id SET DEFAULT nextval('public.tnc_minutes_id_seq'::regclass);
 =   ALTER TABLE public.tnc_minutes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            �           2604    50829    user_role id    DEFAULT     l   ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);
 ;   ALTER TABLE public.user_role ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    292    291            �           2604    50830    user_type id    DEFAULT     l   ALTER TABLE ONLY public.user_type ALTER COLUMN id SET DEFAULT nextval('public.user_type_id_seq'::regclass);
 ;   ALTER TABLE public.user_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    294    293            �           2604    50831    vendor_activities id    DEFAULT     |   ALTER TABLE ONLY public.vendor_activities ALTER COLUMN id SET DEFAULT nextval('public.vendor_activities_id_seq'::regclass);
 C   ALTER TABLE public.vendor_activities ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    295            �           2604    50960    wdc id    DEFAULT     `   ALTER TABLE ONLY public.wdc ALTER COLUMN id SET DEFAULT nextval('public.wdc_id_seq'::regclass);
 5   ALTER TABLE public.wdc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    306    305            �          0    49938    actualsubmissiondate 
   TABLE DATA           �   COPY public.actualsubmissiondate (id, purchasing_doc_no, milestoneid, milestonetext, actualsubmissiondate, created_at, created_by_id) FROM stdin;
    public          postgres    false    215   ��      �          0    49944    auth 
   TABLE DATA           �   COPY public.auth (id, user_type, department_id, internal_role_id, username, password, name, vendor_code, datetime, last_login_time) FROM stdin;
    public          postgres    false    217   ��      �          0    49949    btn 
   TABLE DATA           y  COPY public.btn (btn_num, purchasing_doc_no, invoice_no, invoice_filename, invoice_value, cgst, igst, sgst, e_invoice_no, e_invoice_filename, debit_note, credit_note, debit_credit_filename, net_claim_amount, c_sdbg_date, c_sdbg_filename, a_sdbg_date, demand_raise_filename, gate_entry_no, get_entry_filename, gate_entry_date, grn_no_1, grn_no_2, grn_no_3, grn_no_4, icgrn_no_1, icgrn_no_2, icgrn_no_3, icgrn_no_4, icgrn_total, c_drawing_date, a_drawing_date, c_qap_date, a_qap_date, c_ilms_date, a_ilms_date, pbg_filename, hsn_gstn_icgrn, ld_gate_entry_date, ld_contractual_date, ld_amount, c_drawing_date_do, a_drawing_date_do, drawing_penalty, c_qap_date_do, a_qap_date_do, qap_penalty, c_ilms_date_do, a_ilms_date_do, ilms_penalty, other_penalty, total_penalty, net_payable_amount, updated_by, created_at, created_by_id, vendor_code, icgrn_nos, grn_nos, gst_rate, btn_type) FROM stdin;
    public          postgres    false    219    �      �          0    49997    btn_do 
   TABLE DATA           �   COPY public.btn_do (btn_num, contractual_ld, ld_amount, drg_penalty, qap_penalty, ilms_penalty, other_deduction, total_deduction, net_payable_amout, created_at, created_by, assigned_to) FROM stdin;
    public          postgres    false    220   =�      �          0    50000    cdhdr 
   TABLE DATA           �   COPY public.cdhdr (objectclas, objectid, changenr, username, udate, utime, tcode, planchngnr, act_chngno, was_plannd, change_ind, langu, version, _dataaging, created_at, last_changed_at) FROM stdin;
    public          postgres    false    221   Z�      �          0    50012    cdpos 
   TABLE DATA           �   COPY public.cdpos (objectclas, objectid, changenr, tabname, tabkey, fname, chngind, text_case, unit_old, unit_new, cuky_old, cuky_new, value_new, value_old, _dataaging, created_at, last_changed_at) FROM stdin;
    public          postgres    false    222   ��      �          0    50024    demande_management 
   TABLE DATA           �   COPY public.demande_management (id, status, action_type, reference_no, purchasing_doc_no, line_item_no, request_amount, recived_quantity, demand, delivery_date, created_at, created_by_id, remarks) FROM stdin;
    public          postgres    false    223   ��      �          0    50032    department_wise_log 
   TABLE DATA           �   COPY public.department_wise_log (id, user_id, vendor_code, depertment, action, dept_table_id, remarks, purchasing_doc_no, created_at, created_by_id) FROM stdin;
    public          postgres    false    225   M�      �          0    50042    depertment_master 
   TABLE DATA           5   COPY public.depertment_master (id, name) FROM stdin;
    public          postgres    false    227   j�      �          0    50046    drawing 
   TABLE DATA           �   COPY public.drawing (id, reference_no, purchasing_doc_no, file_name, vendor_code, file_path, remarks, status, actiontype, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    229   �      �          0    50055    ekko 
   TABLE DATA           �   COPY public.ekko (ebeln, bukrs, bstyp, bsart, loekz, aedat, ernam, lifnr, ekorg, ekgrp, created_at, last_changed_at) FROM stdin;
    public          postgres    false    231   ��      �          0    50065    ekpo 
   TABLE DATA           �   COPY public.ekpo (ebeln, ebelp, loekz, statu, aedat, txz01, matnr, bukrs, werks, lgort, matkl, ktmng, menge, meins, netpr, netwr, mwskz, eindt, created_at, last_changed_at) FROM stdin;
    public          postgres    false    232   R�      �          0    50082    emp_department_list 
   TABLE DATA           {   COPY public.emp_department_list (id, dept_name, dept_id, internal_role_id, sub_dept_name, sub_dept_id, emp_id) FROM stdin;
    public          postgres    false    233   ��      �          0    50088    essr 
   TABLE DATA             COPY public.essr (lblni, lblne, ernam, erdat, aedat, aenam, sbnamag, sbnaman, dlort, lbldt, lzvon, lzbis, lwert, uwert, unplv, waers, packno, txz01, ebeln, ebelp, loekz, kzabn, final, frggr, frgsx, frgkl, frgzu, frgrl, f_lock, pwwe, pwfr, bldat, budat, xblnr, bktxt, knttp, kzvbr, netwr, banfn, bnfpo, warpl, wapos, abnum, fknum, fkpos, user1, user2, navnw, spec_no, cuobj, lemin, comp_date, manhrs, rspt, drsbm, qaps, ldel, prpmd, spcim, disbm, sreng, prmta, rejre, wdc, created_at, last_changed_at) FROM stdin;
    public          postgres    false    235   ��      �          0    50140    generic_log 
   TABLE DATA           y   COPY public.generic_log (id, source, req_url, req_method, status_code, msg, stack, created_at, create_at_dt) FROM stdin;
    public          postgres    false    236   ��      �          0    50147    hr 
   TABLE DATA           �   COPY public.hr (id, purchasing_doc_no, action_type, file_name, file_path, remarks, status, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    238   <�      �          0    50156    hr_compliance 
   TABLE DATA           �   COPY public.hr_compliance (id, reference_no, purchasing_doc_no, file_name, vendor_code, file_path, remarks, status, action_type, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    239   @�      �          0    50166    icgrn 
   TABLE DATA           �   COPY public.icgrn (id, purchasing_doc_no, vendor_code, document_type, file_name, file_path, remarks, status, updated_by, created_at, created_by_name, created_by_id) FROM stdin;
    public          postgres    false    242   ]�      �          0    50174    ilms 
   TABLE DATA           �   COPY public.ilms (id, reference_no, purchasing_doc_no, file_name, file_path, remarks, status, vendor_code, type, created_at, created_by_id, updated_by) FROM stdin;
    public          postgres    false    244   z�      �          0    50184    inspection_call_letter 
   TABLE DATA           �   COPY public.inspection_call_letter (id, purchasing_doc_no, file_name, action_type, vendor_code, file_path, remarks, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    246   ��      �          0    50193    inspection_release_note 
   TABLE DATA           �   COPY public.inspection_release_note (id, purchasing_doc_no, file_name, action_type, vendor_code, file_path, remarks, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    248   t�      �          0    50201    internal_role_master 
   TABLE DATA           8   COPY public.internal_role_master (id, name) FROM stdin;
    public          postgres    false    250   �      �          0    50205    lfa1 
   TABLE DATA           �   COPY public.lfa1 (lifnr, land1, name1, ort01, ort02, pfach, stcd1, stcd3, email, phone, created_at, last_changed_at, telf2) FROM stdin;
    public          postgres    false    252   P�      �          0    50217    makt 
   TABLE DATA           W   COPY public.makt (matnr, spras, maktx, maktg, created_at, last_changed_at) FROM stdin;
    public          postgres    false    253   6�      �          0    50223    mara 
   TABLE DATA           ,   COPY public.mara (matnr, mtart) FROM stdin;
    public          postgres    false    254   ��      �          0    50227    material_type 
   TABLE DATA           O   COPY public.material_type (id, material_type, material_type_value) FROM stdin;
    public          postgres    false    255   B�      �          0    50231    mkpf 
   TABLE DATA           M  COPY public.mkpf (mblnr, mjahr, vgart, blart, blaum, bldat, budat, cpudt, cputm, aedat, usnam, tcode, xblnr, bktxt, frath, frbnr, wever, xabln, awsys, bla2d, tcode2, bfwms, exnum, spe_budat_uhr, spe_budat_zone, le_vbeln, spe_logsys, spe_mdnum_ewm, gts_cusref_no, fls_rsto, msr_active, knumv, created_at, last_changed_at) FROM stdin;
    public          postgres    false    257   _�      �          0    50258    mrs 
   TABLE DATA           �   COPY public.mrs (id, purchasing_doc_no, document_type, file_name, file_path, remarks, status, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    258   ��      �          0    50268    mseg 
   TABLE DATA           �  COPY public.mseg (mblnr, mjahr, zeile, line_id, parent_id, line_depth, maa_urzei, bwart, xauto, matnr, werks, lgort, charg, insmk, sobkz, lifnr, kunnr, bwtar, menge, meins, erfmg, erfme, bpmng, bprme, ebeln, ebelp, lfbja, lfbnr, lfpos, sjahr, smbln, smblp, elikz, sgtxt, equnr, wempf, ablad, gsber, kokrs, kostl, aufnr, gjahr, bukrs, buzum, rsnum, rspos, kzstr, kzbew, kzvbr, prctr, ps_psp_pnr, sakto, bstmg, emlif, pprctr, matbf, bustm, bustw, mengu, wertu, lbkum, salk3, vprsv, kzbws, qinspst, urzei, j_1bexbase, mwskz, txjcd, ematn, mat_pspnr, bemot, zustd_t156m, spe_gts_stock_ty, budat_mkpf, cputm_mkpf, usnam_mkpf, xblnr_mkpf, tcode2_mkpf, sgt_scat, sgt_umscat, created_at, last_changed_at) FROM stdin;
    public          postgres    false    260   ��      �          0    50328    pa0002 
   TABLE DATA           C   COPY public.pa0002 (pernr, cname, email, phone, persg) FROM stdin;
    public          postgres    false    261   ��      �          0    50337    ppc_wbs_project_code 
   TABLE DATA           i   COPY public.ppc_wbs_project_code (id, user_id, purchasing_doc_no, wbs_element, project_code) FROM stdin;
    public          postgres    false    262   O�      �          0    50341 	   privilege 
   TABLE DATA           �   COPY public.privilege (id, department_id, internal_role_id, sdbg, drawing, qap, inspectioncallletter, shippingdocuments, gateentry, grn, icgrn, wdc, bpgcopy, checklist, billregistration, paymentvoucher) FROM stdin;
    public          postgres    false    264   l�      �          0    50345    qals 
   TABLE DATA           �  COPY public.qals (prueflos, werk, art, herkunft, objnr, obtyp, stat11, insmk, stat01, stat08, kzskiplot, dyn, hpz, ein, anzsn, stat30, qinfstatus, enstehdat, entstezeit, ersteller, ersteldat, erstelzeit, aenderer, aenderdat, aenderzeit, pastrterm, pastrzeit, paendterm, paendzeit, zaehl, zkriz, zaehl1, selmatnr, stat17, selherst, selkunnr, aufnr, verid, sa_aufnr, kunnr, lifnr, matnr, charg, lagortchrg, zeugnisbis, ps_psp_pnr, kdpos, ekorg, ebeln, ebelp, etenr, mjahr, mblnr, zeile, budat, bwart, ktextlos, ltextkz, ktextmat, losmenge, mengeneinh, lmenge01, lmenge02, lmenge03, lmenge04, lmenge05, lmenge06, matnrneu, chargneu, lmenge07, lmenge08, lmenge09, lmengezub, lmengelz, lmengepr, lmengezer, lmengeist, lmengesch, ltextkzbb, qpmatlos, aufnr_co, kzvbr, knttp, pstyp, stat05, kostl, aufps, kont_pspnr, nplnr, aplzl, dabrz, kstrg, paobjnr, prctr, gsber, konto, kokrs, bukrs, los_ref, project, gate_entry_no, created_at, last_changed_at) FROM stdin;
    public          postgres    false    266   ��      �          0    50416    qap_save 
   TABLE DATA           s   COPY public.qap_save (id, purchasing_doc_no, file_name, file_path, remarks, created_by_id, created_at) FROM stdin;
    public          postgres    false    267   ��      �          0    50422    qap_submission 
   TABLE DATA           �   COPY public.qap_submission (id, reference_no, purchasing_doc_no, file_name, vendor_code, assigned_from, assigned_to, is_assign, file_path, action_type, remarks, status, updated_by, created_at, created_by_name, created_by_id, supporting_doc) FROM stdin;
    public          postgres    false    269   ��      �          0    50436    qave 
   TABLE DATA           #  COPY public.qave (prueflos, kzart, zaehler, vkatart, vwerks, vauswahlmg, vcodegrp, vcode, versionam, versioncd, vbewertung, dbewertung, vfolgeakti, qkennzahl, ltextkz, vname, vdatum, vezeiterf, vaename, vaedatum, vezeitaen, stafo, teillos, vorglfnr, created_at, last_changed_at) FROM stdin;
    public          postgres    false    271   ��      �          0    50456    resb 
   TABLE DATA           �   COPY public.resb (rsnum, rspos, rsart, bdart, rssta, kzear, matnr, werks, lgort, charg, bdmng, meins, enmng, bwart, erfmg, xwaok, xloek, pspel, bdter, created_at, last_changed_at) FROM stdin;
    public          postgres    false    272   ?�      �          0    50473    rkpf 
   TABLE DATA           �   COPY public.rkpf (rsnum, rsdat, usnam, bwart, wempf, kostl, ebeln, ebelp, umwrk, umlgo, ps_psp_pnr, wbs_desc, created_at, last_changed_at) FROM stdin;
    public          postgres    false    273   \�      �          0    50485    sdbg 
   TABLE DATA           �   COPY public.sdbg (id, reference_no, purchasing_doc_no, file_name, file_path, remarks, status, action_type, vendor_code, assigned_from, assigned_to, last_assigned, created_at, created_by_name, created_by_id, updated_by) FROM stdin;
    public          postgres    false    274   y�      �          0    50499 
   sdbg_entry 
   TABLE DATA           R  COPY public.sdbg_entry (id, purchasing_doc_no, bank_name, branch_name, ifsc_code, bank_addr1, bank_addr2, bank_addr3, bank_city, bank_pin_code, bg_no, bg_date, bg_ammount, po_date, yard_no, validity_date, claim_priod, check_list_reference, check_list_date, bg_type, vendor_name, vendor_address1, vendor_address2, vendor_address3, vendor_city, vendor_pin_code, extension_date1, extension_date2, extension_date3, extension_date4, extension_date5, extension_date6, release_date, demand_notice_date, entension_letter_date, status, created_at, last_changed_at, created_by, reference_no) FROM stdin;
    public          postgres    false    275   ��      �          0    50516    shipping_documents 
   TABLE DATA           �   COPY public.shipping_documents (id, purchasing_doc_no, file_name, file_type_id, file_type_name, vendor_code, file_path, remarks, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    278   ��      �          0    50524 
   store_gate 
   TABLE DATA           �   COPY public.store_gate (id, purchasing_doc_no, acc_no, gate_date, file_name, file_path, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    280   ^�      �          0    50527 	   store_grn 
   TABLE DATA              COPY public.store_grn (id, purchasing_doc_no, grn_no, file_name, file_path, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    281   {�      �          0    50531    store_icgrn 
   TABLE DATA           �   COPY public.store_icgrn (id, purchasing_doc_no, icgrn_no, icgrn_value, file_name, file_path, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    283   ��      �          0    50535    sub_dept 
   TABLE DATA           ,   COPY public.sub_dept (id, name) FROM stdin;
    public          postgres    false    285   ��                0    57358    t_email_to_send 
   TABLE DATA           �   COPY public.t_email_to_send (id, event_name, email_to, email_subject, email_cc, email_bcc, email_body, email_send_on, created_by, created_on, modified_by, modified_on, attachment_path, activity_name) FROM stdin;
    public          postgres    false    308   ��      �          0    50539    test 
   TABLE DATA           /   COPY public.test (id, name, email) FROM stdin;
    public          postgres    false    287   ��      �          0    50545    tnc_minutes 
   TABLE DATA           x   COPY public.tnc_minutes (id, file_name, file_path, file_type, created_at, created_by_id, purchasing_doc_no) FROM stdin;
    public          postgres    false    289   &�      �          0    50551 	   user_role 
   TABLE DATA           �   COPY public.user_role (id, user_type_id, ven_bill_submit, ven_bill_show, ven_bill_edit, ven_bill_received, ven_bill_certified, ven_bill_forward) FROM stdin;
    public          postgres    false    291   C�      �          0    50555 	   user_type 
   TABLE DATA           J   COPY public.user_type (id, user_type, created_at, updated_at) FROM stdin;
    public          postgres    false    293   `�      �          0    50559    vendor_activities 
   TABLE DATA           �   COPY public.vendor_activities (id, purchasing_doc_no, action_type, file_name, file_path, remarks, status, updated_by, created_at, created_by_id) FROM stdin;
    public          postgres    false    295   }�      �          0    50569    wbs 
   TABLE DATA           F   COPY public.wbs (wbs_id, project_code, purchasing_doc_no) FROM stdin;
    public          postgres    false    297   Z�                0    50944    wdc 
   TABLE DATA           J  COPY public.wdc (id, reference_no, purchasing_doc_no, action_type, work_done_by, work_title, vendor_code, inspection_note_ref_no, file_inspection_note_ref_no, hinderence_report_cerified_by_berth, file_hinderence_report_cerified_by_berth, attendance_report, file_attendance_report, yard_no, stage_details, job_location, unit, line_item_array, guarantee_defect_liability_start_date, guarantee_defect_liability_end_date, guarantee_defect_liability_status, total_amount, total_amount_status, remarks, status, updated_by, created_at, created_by_name, created_by_id, assigned_to) FROM stdin;
    public          postgres    false    305   w�      �          0    50572    zbts_st 
   TABLE DATA           �  COPY public.zbts_st (zbtno, rerdat, rerzet, rernam, rlaeda, rctime, raenam, lifnr, zvbno, ven_bill_date, ebeln, dpernr1, drerdat1, drerzet1, drernam1, dpernr2, drerdat2, drerzet2, drernam2, daerdat, daerzet, daernam, dalaeda, daaenam, deerdat, deerzet, deernam, delaeda, deaenam, dferdat, dferzet, dfernam, dflaeda, dfaenam, zrmk1, dstatus, fpernr1, zrmk2, fpernr2, zdcomment, zrmk3, zrmk4, zfcomment, fstatus, bstatus, unitno, comno, frerdat, frerzet, frernam, frlaeda, fraenam, faerdat, faerzet, faernam, falaeda, faaenam, feerdat, feerzet, feernam, felaeda, feaenam, fperdat, fperzet, fpernam, fplaeda, fpaenam, bperdat, bperzet, bpernam, bplaeda, bpaenam, hold, alert_gm, alert_dir, alert_agm_dgm) FROM stdin;
    public          postgres    false    298   ^      �          0    50615    zbtsm_st 
   TABLE DATA           q   COPY public.zbtsm_st (zbtno, srno, manno, zsection, rmk, erdat, erzet, ernam, dretseq, alert_status) FROM stdin;
    public          postgres    false    299   �      �          0    50623 	   zfi_bgm_1 
   TABLE DATA             COPY public.zfi_bgm_1 (file_no, ref_no, bankers_name, bankers_branch, bankers_add1, bankers_add2, bankers_add3, bankers_city, b_pin_code, bank_gu_no, bg_date, bg_amount, po_number, department, po_date, yard_no, validity_date, claim_period, checklist_ref, checklist_date, bg_type, vendor_name, vendor_add1, vendor_add2, vendor_add3, vendor_city, v_pin_code, confirmation, extention_date1, extention_date2, extention_date3, extention_date4, extention_date5, extention_date6, release_date, dem_notice_date, ext_letter_date) FROM stdin;
    public          postgres    false    300         �          0    50646    zmm_gate_entry_d 
   TABLE DATA           �  COPY public.zmm_gate_entry_d (entry_no, ebeln, ebelp, w_year, ch_qty, matnr, txz01, gross_wt, tier_wt, net_wt, ch_netwt, zqltysamp, zunloadno, zstrloctn, grwtdt, grwttm, tawtdt, tawttm, zunlddt, zunldtm, zunld_in, zunld_out, zunlddt_out, zunldtm_out, grwtterm, tawtterm, unldterm, zlastdate, zlastterm, zusname, zreason, migostatus, status, tuname, guname, mblnr, vbeln_d, flg, batch, menge_open, recv_flg, last_recv, werks, unuser, ztcode, utype, migostat, tkno, gkno, rsrem, rsuser, gutype, holdid, prch_qty, zrmk1, mjahr, rstno, uncleared_qty, zmblnr, vbeln, posnr, zmjahr, zeile, invno, inv_date, created_at, last_changed_at) FROM stdin;
    public          postgres    false    301   S      �          0    50694    zmm_gate_entry_h 
   TABLE DATA           �   COPY public.zmm_gate_entry_h (entry_no, w_year, entry_date, entry_time, chalan_no, chalan_date, deliv_no, deliv_date, trans_no, tran_name, veh_reg_no, lr_no, lr_date, exnum, exdat, created_at, last_changed_at) FROM stdin;
    public          postgres    false    302                    0    50705    zpo_milestone 
   TABLE DATA           f   COPY public.zpo_milestone (ebeln, mid, mtext, plan_date, mo, created_at, last_changed_at) FROM stdin;
    public          postgres    false    303   �                0    50710    ztfi_bil_deface 
   TABLE DATA           �  COPY public.ztfi_bil_deface (zregnum, seqno, zbillper, zcreate, zdelete, zbilltype, zrecord, zregdate, zpono, zvendor, zcreatedby, zcreatedon, zcreatedat, zmodifiedby, zmodifiedon, zmodifiedat, zcerwdc_s, zcerpay_s, zcerattndr_s, zbgfileno_s, zddno_s, zbscval_m_s, zntsupp_s, znetvalue_s, zcst_vat_s, zcst_vat_txt, ztotalb_s, zadd_othrchrg_s, zadd_othrchrg_txt, zadd_othrchrg_1_s, zadd_othrchrg_1_txt, ztotala_s, zblnc_paymnt_s, zles_inctax_s, zles_inctax_txt, zles_retntn_s, zles_retntn_txt, zles_wrkcontax_s, zles_wrkcontax_txt, zles_ld_s, zles_ld_txt, zles_penalty_s, zles_penalty_txt, zles_sd_s, zles_sd_txt, zles_othr_s, zles_othr_txt, zles_gross_ret, zles_gross_ded, zles_intsd_s, zles_intsd_txt, zles_cstofcon_paint_s, zles_cstofcon_paint_txt, znet_pymnt1_s, znet_blncpay_s, znet_retntn_s, znet_lesdedc_s, znet_pymnt2_s, zles_othrded_s, zles_othrded_txt, zblnc_certby_s, zblnc_pbgfileno_s, zblnc_othrs_s, zld, zobdno_m, zcermarkt_m, zcerinspec_m, zcerguarntee_m, zcercomp_m, zilms, zcpbgfileno_m, zindem_bndfileno_m, zchllnno_m, zchllndate_m, zconsignno_m, zconsigndate_m, zcarrier_m, zactldeldate1_m, zactldeldate2_m, zactldeldate3_m, zpaymntprocess_m, reason_dedctn, zpbgfileno_m, zsrvno_m, zbillno, zbilldate, zschdeldate1_s, zschdeldate2_s, zschdeldate3_s, zdelay1, zdelay2, zdelay3, code_1, code, remarks, reference, remarks_1, ten_per_amount, comments_1, comments, zten_retntn_s, zten_lesdedc_s, miro, miro_date, zten_processed_pymt, ed_ec, created_at, last_changed_at) FROM stdin;
    public          postgres    false    304   7                 0    0    actualsubmissiondate_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.actualsubmissiondate_id_seq', 25, true);
          public          postgres    false    216                       0    0    auth_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.auth_id_seq', 29, true);
          public          postgres    false    218                        0    0    demande_management_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.demande_management_id_seq', 2, true);
          public          postgres    false    224            !           0    0    department_wise_log_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.department_wise_log_id_seq', 1, false);
          public          postgres    false    226            "           0    0    depertment_master_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.depertment_master_id_seq', 17, true);
          public          postgres    false    228            #           0    0    drawing_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.drawing_id_seq', 13, true);
          public          postgres    false    230            $           0    0    emp_department_list_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.emp_department_list_id_seq', 14, true);
          public          postgres    false    234            %           0    0    generic_log_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.generic_log_id_seq', 1619, true);
          public          postgres    false    237            &           0    0    hr_compliance_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.hr_compliance_id_seq', 1, false);
          public          postgres    false    240            '           0    0 	   hr_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('public.hr_id_seq', 4, true);
          public          postgres    false    241            (           0    0    icgrn_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.icgrn_id_seq', 1, false);
          public          postgres    false    243            )           0    0    ilms_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.ilms_id_seq', 9, true);
          public          postgres    false    245            *           0    0    inspection_call_letter_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.inspection_call_letter_id_seq', 1, true);
          public          postgres    false    247            +           0    0    inspection_release_note_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.inspection_release_note_id_seq', 1, true);
          public          postgres    false    249            ,           0    0    internal_role_master_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.internal_role_master_id_seq', 4, true);
          public          postgres    false    251            -           0    0    material_type_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.material_type_id_seq', 1, false);
          public          postgres    false    256            .           0    0 
   mrs_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.mrs_id_seq', 1, false);
          public          postgres    false    259            /           0    0    ppc_wbs_project_code_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ppc_wbs_project_code_id_seq', 1, false);
          public          postgres    false    263            0           0    0    privilege_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.privilege_id_seq', 1, false);
          public          postgres    false    265            1           0    0    qap_save_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.qap_save_id_seq', 1, false);
          public          postgres    false    268            2           0    0    qap_submission_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.qap_submission_id_seq', 8, true);
          public          postgres    false    270            3           0    0    sdbg_entry_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.sdbg_entry_id_seq', 1, false);
          public          postgres    false    276            4           0    0    sdbg_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sdbg_id_seq', 1, false);
          public          postgres    false    277            5           0    0    shipping_documents_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.shipping_documents_id_seq', 3, true);
          public          postgres    false    279            6           0    0    store_grn_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.store_grn_id_seq', 1, false);
          public          postgres    false    282            7           0    0    store_icgrn_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.store_icgrn_id_seq', 1, false);
          public          postgres    false    284            8           0    0    sub_dept_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sub_dept_id_seq', 1, false);
          public          postgres    false    286            9           0    0    t_email_to_send_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.t_email_to_send_id_seq', 1, false);
          public          postgres    false    307            :           0    0    test_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.test_id_seq', 2, true);
          public          postgres    false    288            ;           0    0    tnc_minutes_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tnc_minutes_id_seq', 1, false);
          public          postgres    false    290            <           0    0    user_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_role_id_seq', 1, false);
          public          postgres    false    292            =           0    0    user_type_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_type_id_seq', 1, false);
          public          postgres    false    294            >           0    0    vendor_activities_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.vendor_activities_id_seq', 2, true);
          public          postgres    false    296            ?           0    0 
   wdc_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.wdc_id_seq', 28, true);
          public          postgres    false    306            �           2606    50833 .   actualsubmissiondate actualsubmissiondate_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.actualsubmissiondate
    ADD CONSTRAINT actualsubmissiondate_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.actualsubmissiondate DROP CONSTRAINT actualsubmissiondate_pkey;
       public            postgres    false    215            �           2606    50835    auth auth_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.auth DROP CONSTRAINT auth_pkey;
       public            postgres    false    217            �           2606    50837    btn_do btn_do_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.btn_do
    ADD CONSTRAINT btn_do_pkey PRIMARY KEY (btn_num);
 <   ALTER TABLE ONLY public.btn_do DROP CONSTRAINT btn_do_pkey;
       public            postgres    false    220            �           2606    50839    btn btn_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.btn
    ADD CONSTRAINT btn_pkey PRIMARY KEY (btn_num);
 6   ALTER TABLE ONLY public.btn DROP CONSTRAINT btn_pkey;
       public            postgres    false    219            �           2606    50841    cdhdr cdhdr_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.cdhdr
    ADD CONSTRAINT cdhdr_pkey PRIMARY KEY (objectclas, objectid, changenr);
 :   ALTER TABLE ONLY public.cdhdr DROP CONSTRAINT cdhdr_pkey;
       public            postgres    false    221    221    221            �           2606    50843    cdpos cdpos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cdpos
    ADD CONSTRAINT cdpos_pkey PRIMARY KEY (objectclas, objectid, changenr, tabname, tabkey, fname, chngind);
 :   ALTER TABLE ONLY public.cdpos DROP CONSTRAINT cdpos_pkey;
       public            postgres    false    222    222    222    222    222    222    222            �           2606    50845 *   demande_management demande_management_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.demande_management
    ADD CONSTRAINT demande_management_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.demande_management DROP CONSTRAINT demande_management_pkey;
       public            postgres    false    223            �           2606    50847 ,   department_wise_log department_wise_log_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.department_wise_log
    ADD CONSTRAINT department_wise_log_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.department_wise_log DROP CONSTRAINT department_wise_log_pkey;
       public            postgres    false    225            �           2606    50849 (   depertment_master depertment_master_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.depertment_master
    ADD CONSTRAINT depertment_master_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.depertment_master DROP CONSTRAINT depertment_master_pkey;
       public            postgres    false    227            �           2606    50851    drawing drawing_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.drawing
    ADD CONSTRAINT drawing_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.drawing DROP CONSTRAINT drawing_pkey;
       public            postgres    false    229            �           2606    50853    ekko ekko_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.ekko
    ADD CONSTRAINT ekko_pkey PRIMARY KEY (ebeln);
 8   ALTER TABLE ONLY public.ekko DROP CONSTRAINT ekko_pkey;
       public            postgres    false    231            �           2606    50855    ekpo ekpo_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ekpo
    ADD CONSTRAINT ekpo_pkey PRIMARY KEY (ebeln, ebelp);
 8   ALTER TABLE ONLY public.ekpo DROP CONSTRAINT ekpo_pkey;
       public            postgres    false    232    232            �           2606    50857 ,   emp_department_list emp_department_list_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.emp_department_list
    ADD CONSTRAINT emp_department_list_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.emp_department_list DROP CONSTRAINT emp_department_list_pkey;
       public            postgres    false    233            �           2606    50859    essr essr_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.essr
    ADD CONSTRAINT essr_pkey PRIMARY KEY (lblni);
 8   ALTER TABLE ONLY public.essr DROP CONSTRAINT essr_pkey;
       public            postgres    false    235            �           2606    50861    generic_log generic_log_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.generic_log
    ADD CONSTRAINT generic_log_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.generic_log DROP CONSTRAINT generic_log_pkey;
       public            postgres    false    236            �           2606    50863     hr_compliance hr_compliance_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.hr_compliance
    ADD CONSTRAINT hr_compliance_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.hr_compliance DROP CONSTRAINT hr_compliance_pkey;
       public            postgres    false    239            �           2606    50865 
   hr hr_pkey 
   CONSTRAINT     H   ALTER TABLE ONLY public.hr
    ADD CONSTRAINT hr_pkey PRIMARY KEY (id);
 4   ALTER TABLE ONLY public.hr DROP CONSTRAINT hr_pkey;
       public            postgres    false    238            �           2606    50867    icgrn icgrn_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.icgrn
    ADD CONSTRAINT icgrn_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.icgrn DROP CONSTRAINT icgrn_pkey;
       public            postgres    false    242            �           2606    50869    ilms ilms_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.ilms
    ADD CONSTRAINT ilms_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.ilms DROP CONSTRAINT ilms_pkey;
       public            postgres    false    244            �           2606    50871 2   inspection_call_letter inspection_call_letter_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.inspection_call_letter
    ADD CONSTRAINT inspection_call_letter_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.inspection_call_letter DROP CONSTRAINT inspection_call_letter_pkey;
       public            postgres    false    246            �           2606    50873 4   inspection_release_note inspection_release_note_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.inspection_release_note
    ADD CONSTRAINT inspection_release_note_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.inspection_release_note DROP CONSTRAINT inspection_release_note_pkey;
       public            postgres    false    248            �           2606    50875 .   internal_role_master internal_role_master_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.internal_role_master
    ADD CONSTRAINT internal_role_master_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.internal_role_master DROP CONSTRAINT internal_role_master_pkey;
       public            postgres    false    250            �           2606    50877    lfa1 lfa1_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.lfa1
    ADD CONSTRAINT lfa1_pkey PRIMARY KEY (lifnr);
 8   ALTER TABLE ONLY public.lfa1 DROP CONSTRAINT lfa1_pkey;
       public            postgres    false    252            �           2606    50879    makt makt_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.makt
    ADD CONSTRAINT makt_pkey PRIMARY KEY (matnr);
 8   ALTER TABLE ONLY public.makt DROP CONSTRAINT makt_pkey;
       public            postgres    false    253            �           2606    50881    mara mara_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.mara
    ADD CONSTRAINT mara_pkey PRIMARY KEY (matnr);
 8   ALTER TABLE ONLY public.mara DROP CONSTRAINT mara_pkey;
       public            postgres    false    254            �           2606    50883     material_type material_type_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.material_type
    ADD CONSTRAINT material_type_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.material_type DROP CONSTRAINT material_type_pkey;
       public            postgres    false    255            �           2606    50885    mkpf mkpf_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.mkpf
    ADD CONSTRAINT mkpf_pkey PRIMARY KEY (mblnr, mjahr);
 8   ALTER TABLE ONLY public.mkpf DROP CONSTRAINT mkpf_pkey;
       public            postgres    false    257    257            �           2606    50887    mrs mrs_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.mrs
    ADD CONSTRAINT mrs_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.mrs DROP CONSTRAINT mrs_pkey;
       public            postgres    false    258            �           2606    50889    mseg mseg_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.mseg
    ADD CONSTRAINT mseg_pkey PRIMARY KEY (mblnr, mjahr, zeile);
 8   ALTER TABLE ONLY public.mseg DROP CONSTRAINT mseg_pkey;
       public            postgres    false    260    260    260            �           2606    50891    pa0002 pa0002_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.pa0002
    ADD CONSTRAINT pa0002_pkey PRIMARY KEY (pernr);
 <   ALTER TABLE ONLY public.pa0002 DROP CONSTRAINT pa0002_pkey;
       public            postgres    false    261            �           2606    50893 .   ppc_wbs_project_code ppc_wbs_project_code_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.ppc_wbs_project_code
    ADD CONSTRAINT ppc_wbs_project_code_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.ppc_wbs_project_code DROP CONSTRAINT ppc_wbs_project_code_pkey;
       public            postgres    false    262            �           2606    50895    privilege privilege_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.privilege DROP CONSTRAINT privilege_pkey;
       public            postgres    false    264            �           2606    50897    qals qals_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.qals
    ADD CONSTRAINT qals_pkey PRIMARY KEY (prueflos);
 8   ALTER TABLE ONLY public.qals DROP CONSTRAINT qals_pkey;
       public            postgres    false    266            �           2606    50899    qap_save qap_save_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.qap_save
    ADD CONSTRAINT qap_save_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.qap_save DROP CONSTRAINT qap_save_pkey;
       public            postgres    false    267            �           2606    50901 "   qap_submission qap_submission_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.qap_submission
    ADD CONSTRAINT qap_submission_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.qap_submission DROP CONSTRAINT qap_submission_pkey;
       public            postgres    false    269            �           2606    50903    qave qave_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.qave
    ADD CONSTRAINT qave_pkey PRIMARY KEY (prueflos, kzart, zaehler);
 8   ALTER TABLE ONLY public.qave DROP CONSTRAINT qave_pkey;
       public            postgres    false    271    271    271            �           2606    50905    resb resb_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.resb
    ADD CONSTRAINT resb_pkey PRIMARY KEY (rsnum, rspos, rsart);
 8   ALTER TABLE ONLY public.resb DROP CONSTRAINT resb_pkey;
       public            postgres    false    272    272    272            �           2606    50907    rkpf rkpf_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.rkpf
    ADD CONSTRAINT rkpf_pkey PRIMARY KEY (rsnum);
 8   ALTER TABLE ONLY public.rkpf DROP CONSTRAINT rkpf_pkey;
       public            postgres    false    273            �           2606    50909    sdbg_entry sdbg_entry_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.sdbg_entry
    ADD CONSTRAINT sdbg_entry_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.sdbg_entry DROP CONSTRAINT sdbg_entry_pkey;
       public            postgres    false    275            �           2606    50911    sdbg sdbg_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.sdbg
    ADD CONSTRAINT sdbg_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.sdbg DROP CONSTRAINT sdbg_pkey;
       public            postgres    false    274            �           2606    50913 *   shipping_documents shipping_documents_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.shipping_documents
    ADD CONSTRAINT shipping_documents_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.shipping_documents DROP CONSTRAINT shipping_documents_pkey;
       public            postgres    false    278            �           2606    50915    store_icgrn store_icgrn_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.store_icgrn
    ADD CONSTRAINT store_icgrn_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.store_icgrn DROP CONSTRAINT store_icgrn_pkey;
       public            postgres    false    283                        2606    50917    sub_dept sub_dept_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sub_dept
    ADD CONSTRAINT sub_dept_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sub_dept DROP CONSTRAINT sub_dept_pkey;
       public            postgres    false    285                       2606    50919    tnc_minutes tnc_minutes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tnc_minutes
    ADD CONSTRAINT tnc_minutes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tnc_minutes DROP CONSTRAINT tnc_minutes_pkey;
       public            postgres    false    289                       2606    50921    user_role user_role_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_pkey;
       public            postgres    false    291                       2606    50923    user_type user_type_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_type DROP CONSTRAINT user_type_pkey;
       public            postgres    false    293                       2606    50925 (   vendor_activities vendor_activities_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.vendor_activities
    ADD CONSTRAINT vendor_activities_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.vendor_activities DROP CONSTRAINT vendor_activities_pkey;
       public            postgres    false    295                       2606    50962    wdc wdc_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.wdc
    ADD CONSTRAINT wdc_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.wdc DROP CONSTRAINT wdc_pkey;
       public            postgres    false    305            
           2606    50927    zbts_st zbts_st_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.zbts_st
    ADD CONSTRAINT zbts_st_pkey PRIMARY KEY (zbtno);
 >   ALTER TABLE ONLY public.zbts_st DROP CONSTRAINT zbts_st_pkey;
       public            postgres    false    298                       2606    50929    zbtsm_st zbtsm_st_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.zbtsm_st
    ADD CONSTRAINT zbtsm_st_pkey PRIMARY KEY (zbtno, srno);
 @   ALTER TABLE ONLY public.zbtsm_st DROP CONSTRAINT zbtsm_st_pkey;
       public            postgres    false    299    299                       2606    50931    zfi_bgm_1 zfi_bgm_1_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.zfi_bgm_1
    ADD CONSTRAINT zfi_bgm_1_pkey PRIMARY KEY (file_no, ref_no);
 B   ALTER TABLE ONLY public.zfi_bgm_1 DROP CONSTRAINT zfi_bgm_1_pkey;
       public            postgres    false    300    300                       2606    50933 &   zmm_gate_entry_d zmm_gate_entry_d_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.zmm_gate_entry_d
    ADD CONSTRAINT zmm_gate_entry_d_pkey PRIMARY KEY (entry_no, ebeln, ebelp, w_year);
 P   ALTER TABLE ONLY public.zmm_gate_entry_d DROP CONSTRAINT zmm_gate_entry_d_pkey;
       public            postgres    false    301    301    301    301                       2606    50935 &   zmm_gate_entry_h zmm_gate_entry_h_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.zmm_gate_entry_h
    ADD CONSTRAINT zmm_gate_entry_h_pkey PRIMARY KEY (entry_no, w_year);
 P   ALTER TABLE ONLY public.zmm_gate_entry_h DROP CONSTRAINT zmm_gate_entry_h_pkey;
       public            postgres    false    302    302                       2606    50937     zpo_milestone zpo_milestone_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.zpo_milestone
    ADD CONSTRAINT zpo_milestone_pkey PRIMARY KEY (ebeln, mid);
 J   ALTER TABLE ONLY public.zpo_milestone DROP CONSTRAINT zpo_milestone_pkey;
       public            postgres    false    303    303                       2606    50939 $   ztfi_bil_deface ztfi_bil_deface_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.ztfi_bil_deface
    ADD CONSTRAINT ztfi_bil_deface_pkey PRIMARY KEY (zregnum, seqno, zbillper);
 N   ALTER TABLE ONLY public.ztfi_bil_deface DROP CONSTRAINT ztfi_bil_deface_pkey;
       public            postgres    false    304    304    304            �   �  x���Mn1��3��	
�S\:uQH�'Ȧ�?G)�H֢��6`�-�|�q��!���׷����vy�~��?�\o�������mAGtpEw��
��,�% `�E���A&ha�5G����]���A+�4�Jh��T���h�i�4�J"+c�U�o�m4i�h�����g������<*Ph#�����aTT�rs�ͫ�ꋔ�L�&:�3�4h�R	.�ky�F��(q	���P�T���1U��MwĻ�I�6Z6��x
Ǒ��+ɘ�v���	��ʨ4e��q4�fbR��MI��b�<���/�Oq�L�qJ�q2�b�!��\0�-v+[�3�#˕σ��BjT�������Q�� �^2�A(w�>'�GiM�㢮qǕwܽ,�#=6Zn���=6'6#ca�VY�<��Z�2����8y�t���$C��+�.�H<���������8c�H;�ED��2�ғL�?�HB�h��,�b�}/jq������)      �     x���Mo�@��ïȱ=�{>�qC)�����S%5Ej�&����x�,�T���>y=�' �_�M�m����BJ#���6%�!�!`&3&C%�gtJ�N��r�ՙܺ��JЅ�J�N�n�*z/vQ��X���@��� Zh �/LO E���M��'�$o�+@9P��UͲ(�� ��x+^���.��3";�L=Df�8@�8d��˄B��8$< � � �{� �( 2��Al) �a�BC��8�
	�'H����4|)[
0n���c���0����ү��7���`"ЙL���������t6����h������/C�!��QE`3�3��b}>���R]P&�%������d��{�� �L	�&m��*^��:ڮV��q�z��T%.� �:�δ���l��@z�1{#Ψ�sG�i��"�H�"�c?{f��0�nm�����]�A܅=v��^����U��|P����C-E�G6�u{h�CU�&���d�L�� C��λ���!��o����_������      �      x������ � �      �      x������ � �      �   �   x���;1�ڹȞͷ������`��h��Z.b)o�!"j��k�G�N��rЫ��3#&-��!����0�>����&�6�ll��/��lM��$�o�2	�f�G:g~��JW7EY����hX�2�l����w�= ���      �   �   x����
1�u�1���J�̈�����p��[���B9�p���r����ED��a�$ǔ0�f�n=F���!��mxV�0Na��T{�`�����7�x1��e� ��0�m^���x�<`�'h}kdl��sjcd���5[�;c�n�      �   �   x���1�0���07�B����P�Ia��&Pb-��[��L�[�{��\�{sl�C��m?l�����]�ڤRK]T��V%QJ�
MD����U�7�qg���p��0Ao�+t�8�.�i�K\�?�2�.w�2�U��@�
��V���n�97      �      x������ � �      �   �   x�=�;�0��� ���&v��NR�\ ���h���`E�BZy�S��-�ㄭ:��<$yE���R;ę;Y�BN�a��O������1$�u+N�߼�C5��N�QM��͌���v��?'�_��'�      �   �  x��V�n�0}v�"|@��n?����Pm_�VYhTIa?��!��!! L|�\��o�3�1%�'9�H*(P�*�K�M��I�D�ԋ�?���ҹy��6Q����(^�_\]��݇�u�e�M_~�z��}�R@���Gk��ݏb�:�Ǔ32���!�2�a��O��at:�{~��_M���#��a�
7a�=L��H�p2T�%pA)F"���s�@R6f��K�D�*h���3�����ʇ3�!�����h�N)�,��1�qqX�6cd��������W[5�&2��5�WM)���AxX3���[
������h/��.�.º5C�uWm�(�嬷K7�,�u�ڪ�ҺF��b�s5{�R�<}׎���L����ښ/+>�����^%n�0t��TwOs�l0����2Z�`u�Ũ"�[z���٤
a7dQ)�� �WL�A���i��2\R��)�Ԡg-$5��R	�϶3䷉��oL}KTHۀJ8Nm@[1L�}!F�Z���G�k�eQ�+��y�2��Sgi��j@�����J�+���J*�8e*@!�1&{n�|��>�ԅ���.�������~��EI�F��g�Qxp�m-�+���3�0�A�V�R��M�ڼ�8�?*���      �   �  x����n�0�sx&�qr��U�.Ӯ����KK�
qI�IQ/�O������V_�?���xc� �l���Wu��#�tIV5����<�0��[
N������#���Qx����HP�oY�`�@��
a�7�y�ZTs"j�%a%�ω���UTIB.��]�&��Ȋ��6;2Z �het�K�:�"�M��tS�B�	�w"��8����e �d�!�5��dp��z�E%�݁��eo&0�G>��(E�.D
Y�z>�n�)CӶ�j�총SwFtߛ���<"����j\"n�A�>�#Q	V���_o����^�a=�B��0��i���Н+������PB�Ň`��g��΅B���Z�X��=v.N��F[RH�g�=ư��i&~�6���P�/���C      �   �  x���KO�@ ���W���mff�=�B����O�$��h��w
v]��ڄf������5�]�C`��5	��4����z���������վ��6�M|&R���h�@B׆B֛Ls6�6jp���ڿ,o��i)��Tf���C��!f�y8�!�	1�O�+��`t�=�=�;JeA���A�;��/�v���U��ƷE� l(X>�퐀۱�nx�7�ץIVL�U*-Y�]����[�b�#�`�4e�0�4:\%hb�>1�m�X4��O�kki��7e-A۟�0z�D2�~��L��J\H���K�vc¡_����c���!�ap^�����ZR��:�R@܃���M$�B�%���"u���W�ST@1!�7;;�'�T)��4��W��      �   �   x�}α
�@�z�c���z���Hҧ1"Q8E$��\,�N˝�,��(�d�[B ����6��g�:�����j)��
�dK�m�P7]?��7^+*�ŦSX�W?�ɮ�~�lvрyw����V���B��Z�0X�6	��	�O�St      �      x������ � �      �   z  x���o�0���"���&�w�ij�P[蠝�=T�`"$,1���L³<3�Ԫ !}}����谏hDOYV>�9b���r*o����$ڽ|�����3���!uU�]�(Ʃ'r��Cd�����o0d�9��,mj�ܖ�^�.��z���4h��&d���A��0Y^�u�)���N����!�S�d�����UK��b��F�u8���]��(��/�}粲�e�Y��Ί�����f#֑���[��(�0lB��t��c.d��Ň�X�`A�����e;��"03�V�Rf��GL`�ʚm�m{��7��
���T��XJ��*�;�`F��^ 3L�Xŧ��~';vV�AX�C� ]��8X����c������y#���hj���@���xO8�	��@(CU�� ���f5&��׬qkOF\;���Φ�������k��K�]�`;��51,[�U����#.��j�� č�����{!.�D�̤�8Qf��J�G����Hǥr�T>��W��r��]:���P�1�v�L��uxuk��*���H�XOX�)�|��ֈ��'�ԯ���HZ*�k(��9ƇB<������#~AĻ���W.���3T�ab�'YN��$:/�3���wz�����y�ʊ�:C����)�I΂]$bV��Iű-��e��bD(1��LD�(�A�Nh��.n0�N��쨴ly���wח��n8�G��>~x�uJ�Ru/ש%�w)}�p�pmUr�����j��ֶ⽟����z�7�h湛���W�`C#�05�Xl��6D#�\�H���ni���K�����g�C!��l״V�~+V�RM�ޔ�� ���˘<�N6ҿr�t����v      �   �   x����n�0���S�ОRz襺:Mf� ƛ�T���H`{�	�,�۲�=�~�N�d�q�L��9���e�n�]J �C�@*���`n�èL2�Y�'���}������}��$�z�ZƱ~"�a��"� ��5�𡥎��4���y�lR��lA�k��&�$L��:��M�� D�~�m��z�o�ԥ�d��i4[����_%���}�zmo��16���=���?d�-nЦx� o#�q� X��      �      x������ � �      �      x������ � �      �   ?  x����j�@������q���\�6%6AMV�h5Uj��X��W
�F�7"n���1��^`ټ�� �2۵8%}4E�n�@�s�Y�f�12-3�����қM�䀚�(����M|��]��Y��(�ͽU�%� pi��D�]&R��.�����7�br���7usL�YZ�6�ڶ�(�P����A(��󗾨��{DdT����I.~��v���iC�+� @~ :*������`�B�_�A�a�(�8`.�������2�[r��sKĨDQU���4A��������h��)���i!\�+���a��      �   �   x��ν�0@�}��@���D�Z�mtq�P"I"e��ud5���aq��ůl[l�d�<���yڗ� t���T�S��Jí���J�3r]�x)�/���1V�YN�ɍ���~�'��~�qNX��;�O�>��P_V�i�4z)�_��:�      �   �   x�3��+���44B3S3KݒĤ�T�����D]�G'W�`gW_G���4NO�� W�O?� WW�`W?�WNSsSS�҂��Ĕb��Ҥ��� ?}ҬH�HK��s�s�Bv���-\1z\\\ �(3�      �   1   x�3�t�t�s�2�qts�2�tt����2�p���b���� �!
O      �   �   x�E��j�0Eף��D���kUn��㔦��qAMcbgѿ�]�Yܹ�{�FD�IBQA������*//ǋ������B1Z��(����'��5_�.��kZ7��k�A4��E��$�0ː%��KT�ៀդg�<��<��o�3�$*����N=�$��99�~I�m䱄�ܬ�^\�nn�4�c�f�*3����G2�g�v��_�|@�      �   C   x�30 cCCC3KCCsNWΐ����ԜĒ����x##@��? ����� ��?      �   �   x�u��
�0��y�r�\g[j�MK�n������H<!�|(�����H���u8-����{[�����1�a��{�xi=�'�]h�	���w�ؓ��9�[�#qO<���L��kW'�Jz��*�Uҫ�WI��^=zM2"�����h٦�^�'�X^�ws�����      �      x������ � �      �   T   x�3500021254�428�]A( ��50�56����!gwC(��.���>~!�(rV`��q�e:������ ��?N      �      x������ � �      �      x������ � �      �   B  x�]S�r� }^_��$�fl1�/H*�m��{b'����}9rFvϞ3g��4����*��la�%��
5��
rS��X$�j�%1�`��mIƥ�
��Q����Ցl��qM*���4�<e<�D.!UdT�?�d<�~u���3*D�$��CgI��H�uXU��U�ɭ�B���Y.y ���˫ߟ=i�/(���.���{KS*RX5��b���e�&KҨ�āq�u��X �R@�1�OCN����?�ۜΈ/T0�9m�Z�qκT��5S�y:����e��~�����=z:��ؐ4�9�!I���1��~�7��P�Ƒ�E���T�z�v �g���r�_z�1O�Dpp���9|��L��m���\FĐ>׷`o�A$��c�N�X��Zl�t!6|�G�֧�M�-�e �FW���U�ںe/��^%y,��*r��Tp�E���6�['Sf�q�����Rף��QI�ZU�ESh�BN[bv���߅3x�#ֿ����� �����.���_N��+Q���M)���?;2��;V���=��#��_�c4�����      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   #  x���[o�0��ͯ�xn��v������{X��%�D��K_����P�i���"�u�sN�g��wba�/�0�ژY�:8!d3���Q�X-������|쏠&��Q,�J�q
fWg���`����x
^�A��r%2�C��/5�6k����@�f2{�Y.�R�Q��Xp�G��Ӆ	���cv��e�d�Q�XiL��T���P��T*͊(����`�O'��2j�.�0_��Z蠹v���kp��]���W�6$��m�>ĩff9Je��?�L��z|_���yx��Gj���Zf�a�q�&3�U��j�ɶ����$�s�$ݖ�z��f�h���s�Ƞ%uT�P�D�)�d^ޭ���a0����#�`�e�Ʋ�u)>�������*��*�ی��.�`l��#ʱG�f����o.S�6�������d�bj�FY���#����PVCػ�5j�Tm��X�j���'o�m�qӆ�_=���AK��<�Ct�m�lV���=1�u�d[|O�v���`�m�&���{���i���rZp      �   9   x�34 SCK#NNNcNCΐP0v�I¨?�u��2	!�=... ��t      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�3�4170002374�44BKCSssK#ݒĤ�T�����D]�G'W�`gW_G���4�?200�7751�,-��OL)�/��,(��Kw�O.�M�+)�'�����t�0W?� '#Y�e�����&4p8��U������1z\\\ :c      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �      �   '   x�3�,*�a��������\.#Δ�bF����� N��      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���͎�0��u���Ԃ����4
�R��lAm�_�~u�&�h&g��<q9����H1�e"�l�LM!�i�J�!�_���m�k˿m�rS�J��!cLD�X����=�U3��}u8�ek:Ӛ�|�i�ݪ"y$Rk���Q���x�Rv�ϙ�,��e�rkHP��S!*-�2������w}���^uK���߾eY�Brc      �      x������ � �         �  x���s�8ǟ�_�����Gޜ�w�4�3��N��aȎ�0�@N����
S�"v�8�t��I�+�+퇵1����˵\�slB����T�]�v`@Zh��_���L?�[4F\$LC��]�q�3	���Y&�>dc�L��z�IxQ�gB�`�g�t��xT��x���Ә�,����Y�=b9s���!���JH�5��3���^���`4��������]F�
��8�Q�e�z�
�E���Y0fW���0�aڅ'L�1��N��i�r��eʅ���N��|�'�:�����w���6�Lv#苲T�a$�a"�E���(��Ƣl:K���f������#�; � !���{��P�@x��<�V���]!W1[��8a���&z6֏X��
h�yq��B7^�&�_O�/g��i6O�Q9��A6h���/���a��d]<�[���N<��x���6e�5ќ��Y&���ʑݪ�>V5j�-U{�+篫�Q�pV}�Uȇk�$�闇o�G�~O{�?��uV�D{�}�=��ǽ�E�BB{�n��+1���n��KS�7嬌�� ��$�݉�/��͒��w��etM�fZw�χ�� kə�|����*�|^b�j'G�}˶���5L��6�^.m��8x\��Lk@��|�5�R_y��`c�eѼ:��bh¦x��X.���z��rb�0E�Y�=��="a"ۘ��R��T��x�����z���a��b���F]1�պ�j@�3��9��
G����Fy��(��(��8���$�%��E�����P�� s\�P��J�9-�Z���k����,�*�
?������+���؇��Y��%��5�ߊ����s��{���U��R�"Kw?Ef�t����DU��w�>�&��P#�(�^��ʨl��U<�\�����O�[������ @�`��- _ ��^���z�#�W��>�{{{_c�n      �   o   x���;�@D�ٻ8�`��ڒ����9���|+���(g���:���-�M�e^��	��NA2������'��������S�O�wq����0�ͅC@�n����3�      �   (   x�3202105�400��4�����40�# �+F��� t|�      �   .   x��� N�?H�"��L-��bC\��F�1(F��� z      �   �   x���=�0�ٹKгc;)`da���A)�R!�a*AzC�,��0n ��N���x�L��PW�a�WL��wc�ǫ�l̒FJ�ń�0�[jn9��m����N���-�t�^����ͻ��y��҅,c��]-uSX/����ͺ��������$���O!�;mctl      �   �   x�u��
�0�g�]t��o)MGCɐ%��5R���p:�!��fN#	���s��tT�%	Y�<���W^qՇ�ßb�)Mh����L���|w���K̨.�s�����bV(���.��3s?��>I          �   x���A� �5���SJ�ۡC�I�j����jt!I�0���_�� �{�X��TfʂAer㉝ʋ��3OI/4�� �X��O��Qt�ЌwN��o+m�\�/��S	b��D'�GL�������GR���[�n֣��	��K�            x������ � �     