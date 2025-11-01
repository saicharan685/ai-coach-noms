-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  full_name TEXT,
  age INTEGER,
  weight NUMERIC,
  height NUMERIC,
  activity_level TEXT DEFAULT 'moderate',
  goal TEXT DEFAULT 'maintain',
  daily_calorie_target INTEGER DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT profiles_user_id_key UNIQUE (user_id)
);

-- Create meals table
CREATE TABLE public.meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  meal_type TEXT NOT NULL,
  name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fats NUMERIC DEFAULT 0,
  meal_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create water intake table
CREATE TABLE public.water_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  glasses INTEGER DEFAULT 0,
  intake_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT water_intake_user_date_key UNIQUE (user_id, intake_date)
);

-- Create daily progress table
CREATE TABLE public.daily_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  progress_date DATE DEFAULT CURRENT_DATE,
  total_calories INTEGER DEFAULT 0,
  total_protein NUMERIC DEFAULT 0,
  total_carbs NUMERIC DEFAULT 0,
  total_fats NUMERIC DEFAULT 0,
  water_glasses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT daily_progress_user_date_key UNIQUE (user_id, progress_date)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_intake ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Meals policies
CREATE POLICY "Users can view own meals"
  ON public.meals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals"
  ON public.meals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meals"
  ON public.meals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meals"
  ON public.meals FOR DELETE
  USING (auth.uid() = user_id);

-- Water intake policies
CREATE POLICY "Users can view own water intake"
  ON public.water_intake FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own water intake"
  ON public.water_intake FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own water intake"
  ON public.water_intake FOR UPDATE
  USING (auth.uid() = user_id);

-- Daily progress policies
CREATE POLICY "Users can view own progress"
  ON public.daily_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.daily_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.daily_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX meals_user_id_date_idx ON public.meals(user_id, meal_date DESC);
CREATE INDEX water_intake_user_id_date_idx ON public.water_intake(user_id, intake_date DESC);
CREATE INDEX daily_progress_user_id_date_idx ON public.daily_progress(user_id, progress_date DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_progress_updated_at
  BEFORE UPDATE ON public.daily_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();