// for select inputs
export const genderOptions = [
	{ value: "male", valueToDisplay: "Male" },
	{ value: "female", valueToDisplay: "Female" },
	{ value: "other", valueToDisplay: "Other" },
];

export const qualificationOptions = [
	{ value: "no_education", valueToDisplay: "No Formal Education" },
	{ value: "primary_school", valueToDisplay: "Primary School" },
	{ value: "high_school", valueToDisplay: "High School Diploma" },
	{
		value: "vocational_training",
		valueToDisplay: "Vocational Training/Certificate",
	},
	{ value: "diploma", valueToDisplay: "Diploma" },
	{ value: "associate_degree", valueToDisplay: "Associate Degree" },
	{
		value: "bachelor",
		valueToDisplay: "Bachelor's Degree (B.A./B.Sc./B.E./B.Tech)",
	},
	{
		value: "master",
		valueToDisplay: "Master's Degree (M.A./M.Sc./M.E./M.Tech/MBA)",
	},
	{ value: "doctorate", valueToDisplay: "Doctorate (Ph.D./D.Phil.)" },
	{ value: "post_doctoral", valueToDisplay: "Post-Doctoral Studies" },
	{
		value: "professional_certification",
		valueToDisplay: "Professional Certification",
	},
	{ value: "other", valueToDisplay: "Other" },
];

export const educationType = [
	{ value: "part_time", valueToDisplay: "Part Time" },
	{ value: "full_time", valueToDisplay: "Full Time" },
	{ value: "distance", valueToDisplay: "Distance" },
];
export const preferredJobType = [
	{ value: "", valueToDisplay: "Choose a category" },
	{ value: "On-site", valueToDisplay: "On-site" },
	{ value: "W-F-H", valueToDisplay: "W-F-H" },
	{ value: "Hybrid", valueToDisplay: "Hybrid" },
	{ value: "part_time", valueToDisplay: "Part Time" },
	{ value: "full_time", valueToDisplay: "Full Time" },
	{ value: "contract", valueToDisplay: "Contract" },
	{ value: "internship", valueToDisplay: "Internship" },
	{ value: "remote", valueToDisplay: "Remote" },
	{ value: "temporary", valueToDisplay: "Temporary" },
	{ value: "volunteer", valueToDisplay: "Volunteer" },
	{ value: "freelance", valueToDisplay: "Freelance" },
	{ value: "any", valueToDisplay: "Any" },
];

export const jobTypes = [
	{ value: "web_developer", valueToDisplay: "Web Developer" },
	{ value: "graphics_designer", valueToDisplay: "Graphics Designer" },
	{ value: "ui_ux_designer", valueToDisplay: "UI/UX Designer" },
	{ value: "frontend_developer", valueToDisplay: "Frontend Developer" },
	{ value: "backend_developer", valueToDisplay: "Backend Developer" },
	{ value: "full_stack_developer", valueToDisplay: "Full Stack Developer" },
	{ value: "mobile_app_developer", valueToDisplay: "Mobile App Developer" },
	{ value: "data_analyst", valueToDisplay: "Data Analyst" },
	{ value: "seo_specialist", valueToDisplay: "SEO Specialist" },
	{ value: "digital_marketer", valueToDisplay: "Digital Marketer" },
	{ value: "project_manager", valueToDisplay: "Project Manager" },
	{ value: "content_writer", valueToDisplay: "Content Writer" },
	{ value: "qa_engineer", valueToDisplay: "QA Engineer" },
];

export const companySizeOptions = [
	{ value: "1-10", valueToDisplay: "1-10" },
	{ value: "11-50", valueToDisplay: "11-50" },
	{ value: "51-200", valueToDisplay: "51-200" },
	{ value: "201-500", valueToDisplay: "201-500" },
	{ value: "501-1000", valueToDisplay: "501-1000" },
	{ value: "1001+", valueToDisplay: "1001+" },
];

export const industyTypeOptions = [
	{ value: "IT", valueToDisplay: "IT" },
	{ value: "Finance", valueToDisplay: "Finance" },
	{ value: "Healthcare", valueToDisplay: "Healthcare" },
	{ value: "Energy", valueToDisplay: "Energy" },
	{ value: "Manufacturing", valueToDisplay: "Manufacturing" },
	{ value: "Retail", valueToDisplay: "Retail" },
	{ value: "Education", valueToDisplay: "Education" },
	{ value: "Government", valueToDisplay: "Government" },
	{ value: "Other", valueToDisplay: "Other" },
];

// for multiple select inputs
export const skillOptions = [
	{ value: "javascript", label: "JavaScript" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
	{ value: "csharp", label: "C#" },
	{ value: "ruby", label: "Ruby" },
	{ value: "go", label: "Go" },
	{ value: "html", label: "HTML" },
	{ value: "css", label: "CSS" },
	{ value: "react", label: "React.js" },
	{ value: "angular", label: "Angular" },
	{ value: "vue", label: "Vue.js" },
	{ value: "nodejs", label: "Node.js" },
	{ value: "express", label: "Express.js" },
	{ value: "mongodb", label: "MongoDB" },
	{ value: "mysql", label: "MySQL" },
	{ value: "postgresql", label: "PostgreSQL" },
	{ value: "sql", label: "SQL" },
	{ value: "docker", label: "Docker" },
	{ value: "kubernetes", label: "Kubernetes" },
	{ value: "aws", label: "AWS" },
	{ value: "azure", label: "Azure" },
	{ value: "googlecloud", label: "Google Cloud" },
	{ value: "git", label: "Git" },
	{ value: "github", label: "GitHub" },
	{ value: "gitlab", label: "GitLab" },
	{ value: "ci_cd", label: "CI/CD" },
	{ value: "jest", label: "Jest" },
	{ value: "mocha", label: "Mocha" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "sass", label: "Sass" },
	{ value: "graphql", label: "GraphQL" },
	{ value: "redux", label: "Redux" },
	{ value: "tailwindcss", label: "Tailwind CSS" },
	{ value: "bootstrap", label: "Bootstrap" },
	{ value: "webpack", label: "Webpack" },
	{ value: "firebase", label: "Firebase" },
	{ value: "jest", label: "Jest" },
	{ value: "selenium", label: "Selenium" },
	{ value: "scrum", label: "Scrum" },
	{ value: "agile", label: "Agile" },
	{ value: "vscode", label: "Visual Studio Code" },
	{ value: "docker", label: "Docker" },
	{ value: "linux", label: "Linux" },
	{ value: "windows", label: "Windows" },
	{ value: "machinelearning", label: "Machine Learning" },
	{ value: "deep_learning", label: "Deep Learning" },
	{ value: "tensorflow", label: "TensorFlow" },
	{ value: "pytorch", label: "PyTorch" },
	{ value: "opencv", label: "OpenCV" },
	{ value: "r", label: "R" },
	{ value: "tableau", label: "Tableau" },
	{ value: "powerbi", label: "Power BI" },
	{ value: "spark", label: "Apache Spark" },
	{ value: "hadoop", label: "Hadoop" },
	{ value: "sqlalchemy", label: "SQLAlchemy" },
	{ value: "elasticsearch", label: "Elasticsearch" },
	{ value: "redis", label: "Redis" },
	{ value: "kafka", label: "Apache Kafka" },
	{ value: "rabbitmq", label: "RabbitMQ" },
	{ value: "azuredevops", label: "Azure DevOps" },
	{ value: "jenkins", label: "Jenkins" },
	{ value: "cloudformation", label: "CloudFormation" },
	{ value: "ansible", label: "Ansible" },
	{ value: "terraform", label: "Terraform" },
	{ value: "nginx", label: "Nginx" },
	{ value: "apache", label: "Apache" },
	{ value: "rails", label: "Ruby on Rails" },
	{ value: "flutter", label: "Flutter" },
	{ value: "swift", label: "Swift" },
	{ value: "kotlin", label: "Kotlin" },
	{ value: "xcode", label: "Xcode" },
	{ value: "android", label: "Android Development" },
	{ value: "ios", label: "iOS Development" },
	{ value: "reactnative", label: "React Native" },
	{ value: "ember", label: "Ember.js" },
	{ value: "laravel", label: "Laravel" },
	{ value: "symfony", label: "Symfony" },
];

export const locationOptions = [
	{
		value: "kochi",
		label: "Kochi",
	},
	{ value: "kollam", label: "Kollam" },
	{ value: "kozhikode", label: "Kozhikode" },
	{ value: "alappuzha", label: "Alappuzha" },
	{ value: "ernakulam", label: "Ernakulam" },
	{ value: "idukki", label: "Idukki" },
	{ value: "kannur", label: "Kannur" },
	{ value: "kasaragod", label: "Kasaragod" },
	{ value: "kottayam", label: "Kottayam" },
	{ value: "malappuram", label: "Malappuram" },
	{ value: "palakkad", label: "Palakkad" },
	{ value: "pathanamthitta", label: "Pathanamthitta" },
	{ value: "thiruvananthapuram", label: "Thiruvananthapuram" },
	{ value: "thrissur", label: "Thrissur" },
	{ value: "wayanad", label: "Wayanad" },
];

export const professions = [
	{ value: "web_developer", label: "Web Developer" },
	{ value: "graphics_designer", label: "Graphics Designer" },
	{ value: "ui_ux_designer", label: "UI/UX Designer" },
	{ value: "frontend_developer", label: "Frontend Developer" },
	{ value: "backend_developer", label: "Backend Developer" },
	{ value: "full_stack_developer", label: "Full Stack Developer" },
	{ value: "mobile_app_developer", label: "Mobile App Developer" },
	{ value: "data_scientist", label: "Data Scientist" },
	{ value: "data_analyst", label: "Data Analyst" },
	{ value: "seo_specialist", label: "SEO Specialist" },
	{ value: "digital_marketer", label: "Digital Marketer" },
	{ value: "content_writer", label: "Content Writer" },
	{ value: "copywriter", label: "Copywriter" },
	{ value: "qa_engineer", label: "QA Engineer" },
	{ value: "project_manager", label: "Project Manager" },
	{ value: "product_manager", label: "Product Manager" },
	{ value: "business_analyst", label: "Business Analyst" },
	{ value: "network_administrator", label: "Network Administrator" },
	{ value: "system_administrator", label: "System Administrator" },
	{ value: "cybersecurity_specialist", label: "Cybersecurity Specialist" },
	{ value: "cloud_engineer", label: "Cloud Engineer" },
	{ value: "ai_ml_engineer", label: "AI/ML Engineer" },
	{ value: "teacher", label: "Teacher" },
	{ value: "professor", label: "Professor" },
	{ value: "accountant", label: "Accountant" },
	{ value: "financial_analyst", label: "Financial Analyst" },
	{ value: "banker", label: "Banker" },
	{ value: "lawyer", label: "Lawyer" },
	{ value: "doctor", label: "Doctor" },
	{ value: "nurse", label: "Nurse" },
	{ value: "pharmacist", label: "Pharmacist" },
	{ value: "civil_engineer", label: "Civil Engineer" },
	{ value: "mechanical_engineer", label: "Mechanical Engineer" },
	{ value: "electrical_engineer", label: "Electrical Engineer" },
	{ value: "chemical_engineer", label: "Chemical Engineer" },
	{ value: "architect", label: "Architect" },
	{ value: "chef", label: "Chef" },
	{ value: "pilot", label: "Pilot" },
	{ value: "writer", label: "Writer" },
	{ value: "artist", label: "Artist" },
	{ value: "photographer", label: "Photographer" },
	{ value: "video_editor", label: "Video Editor" },
	{ value: "musician", label: "Musician" },
	{ value: "actor", label: "Actor" },
	{ value: "entrepreneur", label: "Entrepreneur" },
	{ value: "student", label: "Student" },
];
// job portal data
export const categoryData = [
	{ value: "On-site", valueToDisplay: "On-site" },
	{ value: "Remote", valueToDisplay: "Remote" },
	{ value: "W-F-H", valueToDisplay: "W-F-H" },
	{ value: "Hybrid", valueToDisplay: "Hybrid" },
];

export const postedDateData = [
	"All",
	"Last Hour",
	"Last 24 Hours",
	"Last 7 Days",
	"Last 14 Days",
	"Last 30 Days",
];

export const experienceData = [
	{ value: "fresher", valueToDisplay: "Fresher" },
	{ value: "0-1", valueToDisplay: "0-1" },
	{ value: "1-2", valueToDisplay: "1-2" },
	{ value: "2-3", valueToDisplay: "2-3" },
	{ value: "4-6", valueToDisplay: "4-6" },
	{ value: ">6", valueToDisplay: ">6" },
];

export const manageJobsMonthOptions = [
	{ value: "Last 6 Months", valueToDisplay: "Last 6 Months" },
	{ value: "Last 12 Months", valueToDisplay: "Last 12 Months" },
	{ value: "Last 16 Months", valueToDisplay: "Last 16 Months" },
	{ value: "Last 24 Months", valueToDisplay: "Last 24 Months" },
	{ value: "Last 5 Year", valueToDisplay: "Last 5 Year" },
];


/* {
  query: {
    name: 'fgh',
    location: 'dfg',
    category: 'On-site',
    experience: [
      'fresher',
      '0-1'
    ],
    gender: [
      'male',
      'female'
    ],
    sort: 'newest'
  }
} */