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

// job portal data
export const categoryData = ["On-site", "Remote", "W-F-H", "Hybrid"];

export const jobTypeData = [
	"Freelancer",
	"Full Time",
	"Part Time",
	"Internship",
	"Permanent",
	"Contract",
	"Temporary",
];

export const postedDateData = [
	"All",
	"Last Hour",
	"Last 24 Hours",
	"Last 7 Days",
	"Last 14 Days",
	"Last 30 Days",
];

export const experienceData = ["Fresher", "0-1", "1-2", "2-4", "4-6", ">6"];