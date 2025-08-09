-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Tool usage tracking table
CREATE TABLE tool_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_name TEXT NOT NULL,
    category TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_time INTEGER, -- in milliseconds
    file_size INTEGER, -- in bytes
    success BOOLEAN NOT NULL
);

-- Create indexes for analytics queries
CREATE INDEX idx_tool_usage_tool_name ON tool_usage(tool_name);
CREATE INDEX idx_tool_usage_category ON tool_usage(category);
CREATE INDEX idx_tool_usage_timestamp ON tool_usage(timestamp);
CREATE INDEX idx_tool_usage_user_id ON tool_usage(user_id);

-- Ad slots table
CREATE TABLE ad_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    page TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    ad_provider TEXT,
    ad_code TEXT,
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for ad slot queries
CREATE INDEX idx_ad_slots_page_position ON ad_slots(page, position);
CREATE INDEX idx_ad_slots_active ON ad_slots(is_active);

-- Analytics aggregation table (for caching)
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TEXT NOT NULL, -- YYYY-MM-DD format
    tool_name TEXT NOT NULL,
    category TEXT NOT NULL,
    usage_count INTEGER NOT NULL DEFAULT 0,
    success_rate TEXT,
    avg_processing_time INTEGER -- in milliseconds
);

-- Create index for analytics queries
CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_analytics_tool_name ON analytics(tool_name);
CREATE INDEX idx_analytics_category ON analytics(category);

-- User sessions table (optional, for better session management)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

-- SEO data table (for storing page metadata)
CREATE TABLE seo_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    canonical_url TEXT,
    robots TEXT DEFAULT 'index,follow',
    structured_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seo_data_page_path ON seo_data(page_path);

-- File uploads table (for storing processed files temporarily)
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id TEXT,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    tool_name TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX idx_file_uploads_session_id ON file_uploads(session_id);
CREATE INDEX idx_file_uploads_expires_at ON file_uploads(expires_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_data_updated_at BEFORE UPDATE ON seo_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to clean expired files
CREATE OR REPLACE FUNCTION clean_expired_files()
RETURNS void AS $$
BEGIN
    DELETE FROM file_uploads WHERE expires_at < NOW();
END;
$$ language 'plpgsql';

-- Create a scheduled job to clean expired files (requires pg_cron extension)
-- SELECT cron.schedule('clean-expired-files', '0 * * * *', 'SELECT clean_expired_files();');

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@toolsuitepro.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default ad slots
INSERT INTO ad_slots (name, position, page, is_active, ad_provider, settings) VALUES
('Home Top Banner', 'home-top', 'home', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Home Middle Banner', 'home-middle', 'home', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Home Features Banner', 'home-features', 'home', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('PDF Tools Top', 'pdf-tools-top', 'pdf-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('PDF Tools Middle', 'pdf-tools-middle', 'pdf-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('PDF Tools Bottom', 'pdf-tools-bottom', 'pdf-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Image Tools Top', 'image-tools-top', 'image-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Image Tools Middle', 'image-tools-middle', 'image-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Image Tools Bottom', 'image-tools-bottom', 'image-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Audio Tools Top', 'audio-tools-top', 'audio-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Audio Tools Middle', 'audio-tools-middle', 'audio-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Audio Tools Bottom', 'audio-tools-bottom', 'audio-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Text Tools Top', 'text-tools-top', 'text-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Text Tools Middle', 'text-tools-middle', 'text-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Text Tools Bottom', 'text-tools-bottom', 'text-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Productivity Tools Top', 'productivity-tools-top', 'productivity-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Productivity Tools Middle', 'productivity-tools-middle', 'productivity-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Productivity Tools Bottom', 'productivity-tools-bottom', 'productivity-tools', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Tool Interface Top', 'tool-top', 'universal-tool', true, 'google-adsense', '{"size": "728x90", "type": "banner"}'),
('Tool Interface Bottom', 'tool-bottom', 'universal-tool', true, 'google-adsense', '{"size": "728x90", "type": "banner"}')
ON CONFLICT DO NOTHING;

-- Insert default SEO data for main pages
INSERT INTO seo_data (page_path, title, description, keywords) VALUES
('/', 'ToolSuite Pro - Ultimate Online Tools & Converters | PDF, Image, Audio, Text Tools', 'Free online tools and converters for PDF, Image, Audio, Text processing. Convert, compress, edit files instantly. 80+ professional tools in one platform.', 'online tools, file converter, PDF tools, image tools, audio tools, text tools, productivity tools'),
('/pdf-tools', 'PDF Tools & Converters - ToolSuite Pro | Convert, Merge, Split, Compress PDF', 'Professional PDF tools for converting, merging, splitting, and compressing PDF files. 20+ free online PDF converters and editors.', 'PDF converter, PDF tools, merge PDF, split PDF, compress PDF, PDF to Word, PDF editor'),
('/image-tools', 'Image Tools & Converters - ToolSuite Pro | Compress, Resize, Edit Images', 'Professional image editing and conversion tools. Compress images, remove backgrounds, resize photos, and convert formats online for free.', 'image compressor, image resizer, background remover, image converter, photo editor, image tools'),
('/audio-tools', 'Audio Tools & Converters - ToolSuite Pro | Convert, Edit, Compress Audio', 'Professional audio editing and conversion tools. Convert audio formats, compress files, trim clips, and enhance sound quality online for free.', 'audio converter, audio compressor, audio editor, MP3 converter, audio tools, sound editor'),
('/text-tools', 'Text Tools & Converters - ToolSuite Pro | Word Counter, Grammar Checker, Text Editor', 'Professional text processing tools for writers and content creators. Count words, check grammar, convert cases, and format text online for free.', 'word counter, grammar checker, text tools, plagiarism checker, text analyzer, writing tools'),
('/productivity-tools', 'Productivity & Financial Tools - ToolSuite Pro | Calculator, Unit Converter, Invoice Generator', 'Professional productivity tools for business and personal use. Calculator, unit converter, invoice generator, QR codes, and more online tools.', 'calculator, unit converter, productivity tools, QR generator, invoice generator, business tools')
ON CONFLICT (page_path) DO NOTHING;

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Tool usage policies
CREATE POLICY "Users can view own tool usage" ON tool_usage FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Anyone can insert tool usage" ON tool_usage FOR INSERT WITH CHECK (true);

-- Ad slots are public for reading, admin only for modifications
CREATE POLICY "Ad slots are publicly readable" ON ad_slots FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can modify ad slots" ON ad_slots FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id::text = auth.uid()::text AND role = 'admin')
);

-- Analytics are admin only
CREATE POLICY "Only admins can access analytics" ON analytics FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id::text = auth.uid()::text AND role = 'admin')
);

-- User sessions
CREATE POLICY "Users can manage own sessions" ON user_sessions FOR ALL USING (auth.uid()::text = user_id::text);

-- File uploads
CREATE POLICY "Users can manage own files" ON file_uploads FOR ALL USING (
    auth.uid()::text = user_id::text OR session_id IS NOT NULL
);

-- Create storage bucket for file uploads (if using Supabase storage)
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload files" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own files" ON storage.objects FOR SELECT USING (
    bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own files" ON storage.objects FOR DELETE USING (
    bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Comments for documentation
COMMENT ON TABLE users IS 'User accounts and authentication data';
COMMENT ON TABLE tool_usage IS 'Tracking table for tool usage analytics';
COMMENT ON TABLE ad_slots IS 'Configuration for advertisement slots throughout the application';
COMMENT ON TABLE analytics IS 'Aggregated analytics data for reporting';
COMMENT ON TABLE user_sessions IS 'User session management';
COMMENT ON TABLE seo_data IS 'SEO metadata for pages';
COMMENT ON TABLE file_uploads IS 'Temporary storage tracking for uploaded files';

COMMENT ON COLUMN tool_usage.processing_time IS 'Time taken to process the file in milliseconds';
COMMENT ON COLUMN tool_usage.file_size IS 'Size of the processed file in bytes';
COMMENT ON COLUMN ad_slots.settings IS 'JSON configuration for ad slot (size, type, etc.)';
COMMENT ON COLUMN seo_data.structured_data IS 'JSON-LD structured data for the page';
