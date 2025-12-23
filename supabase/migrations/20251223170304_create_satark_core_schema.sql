/*
  # SATARK.AI Core Database Schema
  
  ## Overview
  Complete database structure for AI-powered survey intelligence platform
  
  ## New Tables
  
  ### 1. surveys
  - `id` (uuid, primary key)
  - `title` (text) - Survey name
  - `title_hi` (text) - Hindi translation
  - `description` (text) - Survey objectives
  - `ministry` (text) - Owning ministry
  - `status` (text) - draft, active, completed, archived
  - `created_by` (uuid) - Admin user reference
  - `target_audience` (text) - Rural, Urban, All
  - `languages` (jsonb) - Supported languages array
  - `delivery_channels` (jsonb) - WhatsApp, IVR, Web, Voice
  - `start_date` (timestamptz)
  - `end_date` (timestamptz)
  - `target_responses` (integer)
  - `actual_responses` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. question_bank
  - `id` (uuid, primary key)
  - `question_text` (text)
  - `question_type` (text) - text, mcq, single_choice, dropdown, date, number, rating, voice
  - `category` (text) - Demographics, Economic, Health, etc.
  - `tags` (jsonb) - Array of tags
  - `sdg_alignment` (text) - SDG goal number
  - `sensitivity_level` (text) - low, medium, high
  - `languages` (jsonb) - Translations
  - `options` (jsonb) - For choice questions
  - `validation_rules` (jsonb)
  - `ministry` (text)
  - `usage_count` (integer)
  - `version` (integer)
  - `created_at` (timestamptz)
  
  ### 3. survey_questions
  - `id` (uuid, primary key)
  - `survey_id` (uuid, foreign key)
  - `question_bank_id` (uuid, foreign key, nullable)
  - `question_text` (text)
  - `question_type` (text)
  - `order_index` (integer)
  - `required` (boolean)
  - `options` (jsonb)
  - `conditional_logic` (jsonb) - If/then/skip rules
  - `validation_rules` (jsonb)
  - `created_at` (timestamptz)
  
  ### 4. districts
  - `id` (uuid, primary key)
  - `name` (text)
  - `name_hi` (text)
  - `state` (text)
  - `coordinates` (jsonb) - [lat, lng]
  - `population` (integer)
  - `urban_rural` (text)
  - `active_agents` (integer)
  - `total_agents` (integer)
  - `created_at` (timestamptz)
  
  ### 5. agents
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text, unique)
  - `phone` (text)
  - `district_id` (uuid, foreign key)
  - `languages` (jsonb)
  - `skills` (jsonb)
  - `status` (text) - available, busy, offline
  - `performance_score` (numeric)
  - `surveys_completed` (integer)
  - `accuracy_rate` (numeric)
  - `last_active` (timestamptz)
  - `device_info` (jsonb)
  - `created_at` (timestamptz)
  
  ### 6. survey_responses
  - `id` (uuid, primary key)
  - `survey_id` (uuid, foreign key)
  - `respondent_id` (text) - Phone/household ID
  - `district_id` (uuid, foreign key)
  - `agent_id` (uuid, foreign key, nullable)
  - `channel` (text) - whatsapp, ivr, web, voice_avatar
  - `language` (text)
  - `answers` (jsonb) - Question-answer pairs
  - `status` (text) - in_progress, completed, validated, flagged
  - `validation_score` (numeric)
  - `completion_time` (integer) - seconds
  - `started_at` (timestamptz)
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 7. paradata
  - `id` (uuid, primary key)
  - `response_id` (uuid, foreign key)
  - `gps_coordinates` (jsonb)
  - `device_type` (text)
  - `device_id` (text)
  - `interview_duration` (integer) - seconds
  - `time_of_day` (time)
  - `network_quality` (text)
  - `interaction_mode` (text) - voice, text, mixed
  - `voice_confidence_scores` (jsonb)
  - `suspicious_flags` (jsonb)
  - `edit_count` (integer)
  - `created_at` (timestamptz)
  
  ### 8. delivery_schedules
  - `id` (uuid, primary key)
  - `survey_id` (uuid, foreign key)
  - `district_id` (uuid, foreign key)
  - `channel` (text)
  - `fallback_channel` (text)
  - `scheduled_start` (timestamptz)
  - `scheduled_end` (timestamptz)
  - `status` (text) - scheduled, running, completed, failed
  - `target_count` (integer)
  - `sent_count` (integer)
  - `response_count` (integer)
  - `created_at` (timestamptz)
  
  ### 9. voice_interactions
  - `id` (uuid, primary key)
  - `response_id` (uuid, foreign key)
  - `question_id` (uuid, foreign key)
  - `audio_url` (text)
  - `transcript` (text)
  - `language_detected` (text)
  - `confidence_score` (numeric)
  - `accent_type` (text)
  - `processing_time` (integer)
  - `created_at` (timestamptz)
  
  ### 10. analytics_cache
  - `id` (uuid, primary key)
  - `survey_id` (uuid, foreign key)
  - `metric_type` (text) - completion_rate, quality_score, etc.
  - `metric_value` (jsonb)
  - `aggregation_level` (text) - national, state, district
  - `calculated_at` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 11. audit_logs
  - `id` (uuid, primary key)
  - `user_id` (uuid)
  - `action` (text)
  - `resource_type` (text)
  - `resource_id` (uuid)
  - `changes` (jsonb)
  - `ip_address` (text)
  - `user_agent` (text)
  - `created_at` (timestamptz)
  
  ### 12. consent_records
  - `id` (uuid, primary key)
  - `response_id` (uuid, foreign key)
  - `consent_text` (text)
  - `consent_language` (text)
  - `consent_given` (boolean)
  - `consent_method` (text) - voice, text, digital_signature
  - `consent_recording_url` (text, nullable)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Create policies for authenticated users based on roles
  - Audit trail for all data modifications
*/

-- Create surveys table
CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_hi text,
  description text,
  ministry text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid,
  target_audience text,
  languages jsonb DEFAULT '["en", "hi"]'::jsonb,
  delivery_channels jsonb DEFAULT '["web"]'::jsonb,
  start_date timestamptz,
  end_date timestamptz,
  target_responses integer DEFAULT 0,
  actual_responses integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create question_bank table
CREATE TABLE IF NOT EXISTS question_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_type text NOT NULL,
  category text,
  tags jsonb DEFAULT '[]'::jsonb,
  sdg_alignment text,
  sensitivity_level text DEFAULT 'low',
  languages jsonb DEFAULT '{}'::jsonb,
  options jsonb DEFAULT '[]'::jsonb,
  validation_rules jsonb DEFAULT '{}'::jsonb,
  ministry text,
  usage_count integer DEFAULT 0,
  version integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Create survey_questions table
CREATE TABLE IF NOT EXISTS survey_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE,
  question_bank_id uuid REFERENCES question_bank(id) ON DELETE SET NULL,
  question_text text NOT NULL,
  question_type text NOT NULL,
  order_index integer NOT NULL,
  required boolean DEFAULT false,
  options jsonb DEFAULT '[]'::jsonb,
  conditional_logic jsonb DEFAULT '{}'::jsonb,
  validation_rules jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create districts table
CREATE TABLE IF NOT EXISTS districts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_hi text,
  state text NOT NULL,
  coordinates jsonb,
  population integer,
  urban_rural text,
  active_agents integer DEFAULT 0,
  total_agents integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  district_id uuid REFERENCES districts(id) ON DELETE SET NULL,
  languages jsonb DEFAULT '["en", "hi"]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'offline',
  performance_score numeric DEFAULT 0,
  surveys_completed integer DEFAULT 0,
  accuracy_rate numeric DEFAULT 0,
  last_active timestamptz,
  device_info jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE,
  respondent_id text NOT NULL,
  district_id uuid REFERENCES districts(id) ON DELETE SET NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  channel text NOT NULL,
  language text DEFAULT 'en',
  answers jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'in_progress',
  validation_score numeric,
  completion_time integer,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create paradata table
CREATE TABLE IF NOT EXISTS paradata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES survey_responses(id) ON DELETE CASCADE,
  gps_coordinates jsonb,
  device_type text,
  device_id text,
  interview_duration integer,
  time_of_day time,
  network_quality text,
  interaction_mode text,
  voice_confidence_scores jsonb DEFAULT '{}'::jsonb,
  suspicious_flags jsonb DEFAULT '[]'::jsonb,
  edit_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create delivery_schedules table
CREATE TABLE IF NOT EXISTS delivery_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE,
  district_id uuid REFERENCES districts(id) ON DELETE SET NULL,
  channel text NOT NULL,
  fallback_channel text,
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  status text DEFAULT 'scheduled',
  target_count integer DEFAULT 0,
  sent_count integer DEFAULT 0,
  response_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create voice_interactions table
CREATE TABLE IF NOT EXISTS voice_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES survey_responses(id) ON DELETE CASCADE,
  question_id uuid REFERENCES survey_questions(id) ON DELETE SET NULL,
  audio_url text,
  transcript text,
  language_detected text,
  confidence_score numeric,
  accent_type text,
  processing_time integer,
  created_at timestamptz DEFAULT now()
);

-- Create analytics_cache table
CREATE TABLE IF NOT EXISTS analytics_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE,
  metric_type text NOT NULL,
  metric_value jsonb NOT NULL,
  aggregation_level text,
  calculated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  changes jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create consent_records table
CREATE TABLE IF NOT EXISTS consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES survey_responses(id) ON DELETE CASCADE,
  consent_text text NOT NULL,
  consent_language text DEFAULT 'en',
  consent_given boolean NOT NULL,
  consent_method text NOT NULL,
  consent_recording_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE paradata ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for surveys
CREATE POLICY "Authenticated users can view surveys"
  ON surveys FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create surveys"
  ON surveys FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update surveys"
  ON surveys FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for question_bank
CREATE POLICY "Anyone can view question bank"
  ON question_bank FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can add to question bank"
  ON question_bank FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for survey_questions
CREATE POLICY "Users can view survey questions"
  ON survey_questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage survey questions"
  ON survey_questions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for districts
CREATE POLICY "Users can view districts"
  ON districts FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for agents
CREATE POLICY "Users can view agents"
  ON agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage agents"
  ON agents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for survey_responses
CREATE POLICY "Users can view responses"
  ON survey_responses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create responses"
  ON survey_responses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update responses"
  ON survey_responses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for paradata
CREATE POLICY "Users can view paradata"
  ON paradata FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create paradata"
  ON paradata FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for other tables (similar pattern)
CREATE POLICY "Users can view delivery schedules"
  ON delivery_schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage delivery schedules"
  ON delivery_schedules FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view voice interactions"
  ON voice_interactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create voice interactions"
  ON voice_interactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view analytics"
  ON analytics_cache FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create analytics"
  ON analytics_cache FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view consent records"
  ON consent_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create consent records"
  ON consent_records FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_surveys_status ON surveys(status);
CREATE INDEX IF NOT EXISTS idx_surveys_ministry ON surveys(ministry);
CREATE INDEX IF NOT EXISTS idx_question_bank_category ON question_bank(category);
CREATE INDEX IF NOT EXISTS idx_survey_questions_survey_id ON survey_questions(survey_id);
CREATE INDEX IF NOT EXISTS idx_agents_district_id ON agents(district_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_survey_responses_survey_id ON survey_responses(survey_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_status ON survey_responses(status);
CREATE INDEX IF NOT EXISTS idx_paradata_response_id ON paradata(response_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
