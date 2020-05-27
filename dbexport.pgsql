--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usermanage; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.usermanage (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    department text,
    job_title text,
    role text NOT NULL,
    password text
);


ALTER TABLE public.usermanage OWNER TO root;

--
-- Name: usermanage_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.usermanage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usermanage_id_seq OWNER TO root;

--
-- Name: usermanage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.usermanage_id_seq OWNED BY public.usermanage.id;


--
-- Name: usermanage id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.usermanage ALTER COLUMN id SET DEFAULT nextval('public.usermanage_id_seq'::regclass);


--
-- Data for Name: usermanage; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.usermanage (id, name, email, department, job_title, role, password) FROM stdin;
3	Nara Tip	SS@SS.com	IT	IT	Manager	1234
4	Chayada lipat	DD@DD.com	BOMO	bomo	Admin	1234
5	Tanapat wronglung	PP@PP.com	HR	hr	Manager	1234
1	Tisavara	TTTT@TT.com	IT	Manager	Admin	Aa111111
10	tiwatip	phed2014@gmail.com	IT	chef	Admin	1234
11	BB	BB@BB.com	HR	hr	User	Bb111111
2	Chertam	CC@CC.com	IT	IT	Manager	rod09pi7
\.


--
-- Name: usermanage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.usermanage_id_seq', 11, true);


--
-- Name: usermanage usermanage_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.usermanage
    ADD CONSTRAINT usermanage_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

