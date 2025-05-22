CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION secure_random_bigint() RETURNS bigint AS $$
DECLARE
    v_bytes bytea;
    v_value bigint := 0;
    v_length integer := 8;
    i integer := 0;
BEGIN
	v_bytes := gen_random_bytes(v_length);
	FOR i IN 0..v_length-1 LOOP
		v_value := (v_value << 8) | get_byte(v_bytes, i);
	END LOOP;
    RETURN v_value::bigint;
END;
$$ LANGUAGE plpgsql;

/*
 * MIT License
 *
 * Copyright (c) 2023-2024 Fabio Lima
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
 
/**
 * Returns a time-ordered UUID with Unix Epoch (UUIDv7).
 * 
 * Referencie: https://www.rfc-editor.org/rfc/rfc9562.html
 *
 * MIT License.
 *
 */
CREATE OR REPLACE FUNCTION uuid_generate_v7(p_timestamp TIMESTAMPTZ DEFAULT clock_timestamp()) RETURNS UUID AS $$
DECLARE

    v_time DOUBLE PRECISION := NULL;

    v_unix_t INT8 := NULL;
    v_rand_a INT8 := NULL;
    v_rand_b INT8 := NULL;

    v_unix_t_hex VARCHAR := NULL;
    v_rand_a_hex VARCHAR := NULL;
    v_rand_b_hex VARCHAR := NULL;

    c_milli DOUBLE PRECISION := 10^3;  -- 1 000
    c_micro DOUBLE PRECISION := 10^6;  -- 1 000 000
    c_scale DOUBLE PRECISION := 4.096; -- 4.0 * (1024 / 1000)
    
    c_version INT8 := x'0000000000007000'::INT8;  -- RFC-9562 version: b'0111...'
    c_variant INT8 := x'8000000000000000'::INT8;  -- RFC-9562 variant: b'10xx...'

BEGIN

    v_time := EXTRACT(EPOCH FROM p_timestamp);

    v_unix_t := TRUNC(v_time * c_milli);
    v_rand_a := TRUNC((v_time * c_micro - v_unix_t * c_milli) * c_scale);
    v_rand_b := secure_random_bigint(); -- Use only with pgcrypto installed

    v_unix_t_hex := LPAD(TO_HEX(v_unix_t), 12, '0');
    v_rand_a_hex := LPAD(TO_HEX((v_rand_a | c_version)::INT8), 4, '0');
    v_rand_b_hex := LPAD(TO_HEX((v_rand_b | c_variant)::INT8), 16, '0');

    RETURN (v_unix_t_hex || v_rand_a_hex || v_rand_b_hex)::UUID;

END $$ LANGUAGE plpgsql;