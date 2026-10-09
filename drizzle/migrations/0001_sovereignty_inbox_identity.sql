ALTER TABLE public.community_messages ADD COLUMN email text;
ALTER TABLE public.community_messages ADD COLUMN anonymous boolean NOT NULL DEFAULT false;
ALTER TABLE public.community_messages ADD CONSTRAINT valid_contact_email CHECK (email IS NULL OR (char_length(email) BETWEEN 3 AND 254 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'));
ALTER TABLE public.community_messages ADD CONSTRAINT anonymous_identity CHECK (NOT anonymous OR (name = 'Anónima' AND public_response <> 'Sí'));
COMMENT ON COLUMN public.community_messages.email IS 'Reply address. Nullable for compatibility with the previous contact form; required by the current form.';