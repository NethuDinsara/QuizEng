/* ─────────────────────────────────────────
   TechQuiz — script.js
   Quiz engine: questions, state, rendering
   ───────────────────────────────────────── */

/* ══════════════════════════════════════════
   QUESTIONS DATA
   Each item has:
     type       "mcq" | "short"
     question   string
     options    string[] (mcq only)
     answer     string  (exact for mcq, lowercase flexible for short)
     hint       string  (shown after short-answer reveal)
══════════════════════════════════════════ */
const questions = [
  {
    "type": "mcq",
    "question": "A company is migrating to the AWS cloud instead of running its infrastructure on premise. Which of the following are advantages of this migration? Choose two options.",
    "options": [
      "Elimination of the need to perform security auditing",
      "Increased global reach and agility",
      "Ability to deploy globally in minutes",
      "Elimination of the cost of IT staff members",
      "Redundancy by default for all compute services"
    ],
    "answer": "Increased global reach and agility, Ability to deploy globally in minutes",
    "hint": "Trade fixed expense for variable, economies of scale, go global in minutes."
  },
  {
    "type": "mcq",
    "question": "A company needs significant cost savings for their non-interruptible workloads on AWS. Which EC2 instance pricing model should the company select?",
    "options": [
      "Dedicated hosts",
      "Reserved instances",
      "Spot instances",
      "On demand instances"
    ],
    "answer": "Reserved instances",
    "hint": "Significant discount up to 72% compared to on-demand."
  },
  {
    "type": "mcq",
    "question": "Which component of the AWS global infrastructure is made of one or more discrete data centers that have redundant power networking and connectivity.",
    "options": [
      "AWS region",
      "Availability zone",
      "Edge location",
      "AWS outposts"
    ],
    "answer": "Availability zone",
    "hint": "Discrete data centers within a region."
  },
  {
    "type": "mcq",
    "question": "What is the most cost effective Amazon S3 storage tier for data that is not often accessed but requires high availability?",
    "options": [
      "Amazon S3 standard",
      "Amazon Glacier",
      "Amazon S3 zone IIA",
      "Amazon S3 standard IIA"
    ],
    "answer": "Amazon S3 standard IIA",
    "hint": "Infrequent access with high availability, but not archival like Glacier."
  },
  {
    "type": "mcq",
    "question": "A company wants to migrate a critical application to AWS. The application has a short runtime. The application is invoked by changes in data or by shift in system state. The company needs a compute solution that maximizes operational efficiency and minimizes the cost of running the application. Which AWS solution should the company use to meet these requirements?",
    "options": [
      "Amazon EC2 spot instances",
      "Amazon EC2 reserved instances",
      "AWS Lambda",
      "Amazon EC2 on demand instances"
    ],
    "answer": "AWS Lambda",
    "hint": "Serverless, event-driven compute service with short runtimes."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or feature can a company use to determine which business unit is using specific AWS resources?",
    "options": [
      "Amazon inspector",
      "Cost allocation tags",
      "Key pairs",
      "AWS trusted advisor"
    ],
    "answer": "Cost allocation tags",
    "hint": "Organize resources and track costs at a detailed level."
  },
  {
    "type": "mcq",
    "question": "Which of the following task requires using AWS account root credentials?",
    "options": [
      "Changing the AWS support plan",
      "Starting and stopping Amazon EC2 instances",
      "Opening an AWS support case",
      "Viewing billing information"
    ],
    "answer": "Changing the AWS support plan",
    "hint": "Day-to-day tasks should use IAM, but changing account settings like support plan needs root."
  },
  {
    "type": "mcq",
    "question": "The ability to horizontally scale Amazon EC2 instances based on demand is an example of which concept.",
    "options": [
      "Economy of scale",
      "High availability",
      "Disaster recovery",
      "Elasticity"
    ],
    "answer": "Elasticity",
    "hint": "Acquire or release resources based on current demand."
  },
  {
    "type": "mcq",
    "question": "Which statement is correct in relation to the AWS shared responsibility model?",
    "options": [
      "AWS is responsible for encrypting customer data",
      "AWS is responsible for the security of regions and availability zones",
      "Customers are responsible for the security of the cloud",
      "Customers are responsible for patching and fixing flaws within the infrastructure"
    ],
    "answer": "AWS is responsible for the security of regions and availability zones",
    "hint": "AWS manages security 'of' the cloud; customers manage security 'in' the cloud."
  },
  {
    "type": "mcq",
    "question": "Which of the following are architectural best practices for AWS cloud? You need to choose two options.",
    "options": [
      "Deploy into a single availability zone",
      "Deploy into a multiple availability zone",
      "Design for fall tolerance",
      "Close coupling",
      "Create monolithic architectures"
    ],
    "answer": "Deploy into a multiple availability zone, Design for fall tolerance",
    "hint": "Key design principles for high availability and reliability."
  },
  {
    "type": "mcq",
    "question": "An organization has an onremise environment which they want to connect to their AWS environment. How can they achieve this hybrid cloud configuration which avoids using internet?",
    "options": [
      "AWS managedVPN",
      "AWS direct connect",
      "AWS VPC endpoint",
      "AWS siteto-sightVPN"
    ],
    "answer": "AWS direct connect",
    "hint": "Private, low-latency connection bypassing the public internet."
  },
  {
    "type": "mcq",
    "question": "A company wants is its workloads to be resilient, perform correctly, consistently and recover from errors in a timely manner as part of its cloud architecture. Which pillar of the AWS wellarchchitected framework are these requirements related to?",
    "options": [
      "Security",
      "Operational excellence",
      "Performance efficiency",
      "Reliability"
    ],
    "answer": "Reliability",
    "hint": "Focus on fault tolerance, automated recovery, and consistent performance."
  },
  {
    "type": "mcq",
    "question": "A company needs to simultaneously process hundreds of requests from different users. Which combination of AWS services should the company use to build an operationally efficient solution?",
    "options": [
      "AWS amplify and AWS apps sync",
      "AWS data pipeline and Amazon EC2",
      "Amazon SQS and AWS Lambda",
      "Amazon Kinesis and Amazon Athena"
    ],
    "answer": "Amazon SQS and AWS Lambda",
    "hint": "Decoupled architecture for processing multiple asynchronous requests."
  },
  {
    "type": "mcq",
    "question": "What is the scope of a VPC within the AWS network?",
    "options": [
      "VPC can span all availability zones within an AWS region",
      "VPC can span all availability zones globally",
      "VPC must span at least two subnets in each AWS region",
      "VPC must span at least two edge locations in each AWS region"
    ],
    "answer": "VPC can span all availability zones within an AWS region",
    "hint": "A VPC is a logically isolated network specific to a single region."
  },
  {
    "type": "mcq",
    "question": "What responsibility does a customer have when using Amazon RDS to host a database according to AWS shared responsibility model?",
    "options": [
      "Install Microsoft SQL server",
      "Design encryption at rest strategies",
      "Manage connections to the database",
      "Apply minor database patches"
    ],
    "answer": "Manage connections to the database",
    "hint": "Customer controls access/connectivity; AWS manages engine and patches."
  },
  {
    "type": "mcq",
    "question": "What is the benefit of using fully managed services in AWS compared to deploying third-party software on EC2?",
    "options": [
      "You don't need to back up your data",
      "You have greater control and flexibility",
      "Improved security",
      "Reduced operational overhead"
    ],
    "answer": "Reduced operational overhead",
    "hint": "AWS manages infrastructure and part of the service layer."
  },
  {
    "type": "mcq",
    "question": "Which AWS services are delivered globally and not regionally? You need to choose two.",
    "options": [
      "Amazon Route 53",
      "Amazon CloudFront",
      "Amazon VPC",
      "Amazon EC2",
      "Amazon RDS"
    ],
    "answer": "Amazon Route 53, Amazon CloudFront",
    "hint": "These services function across regions without being tied to one."
  },
  {
    "type": "mcq",
    "question": "Which AWS service is used to enable multiffactor authentication?",
    "options": [
      "AWS IM",
      "Amazon EC2",
      "AWS IM and AWS KMS",
      "AWS Trusted Advisor"
    ],
    "answer": "AWS IM",
    "hint": "Primary service for identity and access management."
  },
  {
    "type": "mcq",
    "question": "What is the most secure method when storing passwords on AWS?",
    "options": [
      "Store passwords as AWS cloud formation parameters",
      "Store passwords in AWS secrets manager",
      "Store passwords in an Amazon S3 bucket",
      "Store passwords in AWS KMS"
    ],
    "answer": "Store passwords in AWS secrets manager",
    "hint": "Purposely designed to manage and rotate credentials securely."
  },
  {
    "type": "mcq",
    "question": "An organization is migrating its application from onremise SQL server to AWS. As part of the migration, the company wants to reduce operational overhead but does not want to refactor the application. Which database service would most effectively support these requirements?",
    "options": [
      "Amazon Red Shift",
      "Microsoft SQL Server on Amazon EC2",
      "Amazon Dynamo DB",
      "Amazon RDS for SQL Server"
    ],
    "answer": "Amazon RDS for SQL Server",
    "hint": "Managed relational database service that reduces operational burden without code changes."
  },
  {
    "type": "mcq",
    "question": "Which of the following are the responsibilities of a company that is using AWS Lambda? Choose two options.",
    "options": [
      "Selection of CPU resources",
      "Patching of operating system",
      "Security of their code",
      "Security of underlying infrastructure",
      "Writing and updating of their code"
    ],
    "answer": "Security of their code, Writing and updating of their code",
    "hint": "Customer is responsible for code and access management; AWS manages infrastructure."
  },
  {
    "type": "mcq",
    "question": "Which of the following are the components of AWS siteto-sightVPN connection? Choose two options.",
    "options": [
      "Virtual private gateway",
      "AWS storage gateway",
      "Internet gateway",
      "Customer gateway",
      "NAT gateway"
    ],
    "answer": "Virtual private gateway, Customer gateway",
    "hint": "Anchors the VPN on the AWS side and the remote side respectively."
  },
  {
    "type": "mcq",
    "question": "Which storage type can be mounted using the NFS protocol to many EC2 instances simultaneously?",
    "options": [
      "Amazon EBS",
      "Amazon Instance store",
      "Amazon EFS",
      "Amazon S3"
    ],
    "answer": "Amazon EFS",
    "hint": "Network File System for shared access by multiple instances."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or feature acts as a firewall for Amazon EC2 instances?",
    "options": [
      "Security group",
      "Network ACL",
      "Amazon VPC",
      "Elastic network interface"
    ],
    "answer": "Security group",
    "hint": "Stateful firewall operating at the instance level."
  },
  {
    "type": "mcq",
    "question": "A system engineer discovers that Amazon EC2 instances have been terminated. Which AWS service should the system engineer use to identify the user or API call that terminated these instances?",
    "options": [
      "Amazon Inspector",
      "AWS Trusted Advisor",
      "AWS Cloud Trail",
      "AWS Artifact"
    ],
    "answer": "AWS Cloud Trail",
    "hint": "Logs API calls and account activity for governance and auditing."
  },
  {
    "type": "mcq",
    "question": "Which AWS service will help protect applications running on AWS against DDoS attacks?",
    "options": [
      "Amazon Inspector",
      "AWS Shield",
      "AWS VAF",
      "Amazon Guard Duty"
    ],
    "answer": "AWS Shield",
    "hint": "Managed protection service against Distributed Denial of Service."
  },
  {
    "type": "mcq",
    "question": "Company has a single Amazon EC2 instance. The company wants to adopt a highly available architecture. What can the company do to meet these requirements?",
    "options": [
      "Purchase an EC2 dedicated instance",
      "Change the EC2 instance family to a compute optimized instance",
      "Scale horizontally across multiple availability zones",
      "Scale vertically to a large EC2 instance size"
    ],
    "answer": "Scale horizontally across multiple availability zones",
    "hint": "Distribute instances across AZs to handle load increase and improve reliability."
  },
  {
    "type": "mcq",
    "question": "AWS has the ability to achieve lower pay as you go pricing by aggregating usage across hundreds of thousands of users. This describes which advantage of the AWS cloud.",
    "options": [
      "No guessing about compute capacity",
      "Massive economies of scale",
      "Increased speed and agility",
      "Go global in minutes"
    ],
    "answer": "Massive economies of scale",
    "hint": "Higher economies of scale translated to lower pay-as-you-go prices."
  },
  {
    "type": "mcq",
    "question": "A company's onremise application deployment cycle was 3 to four weeks. The company can deploy the application in two to three days after migrating to AWS cloud. Which benefit has the company leveraged by moving to AWS cloud?",
    "options": [
      "Agility",
      "Resilience",
      "Elasticity",
      "Flexibility"
    ],
    "answer": "Agility",
    "hint": "Speed of resource provisioning."
  },
  {
    "type": "mcq",
    "question": "Which AWS service can be used to track configuration history of your AWS resources?",
    "options": [
      "AWS service catalog",
      "Amazon guard duty",
      "AWS artifact",
      "AWS config"
    ],
    "answer": "AWS config",
    "hint": "Records changes for configuration history and compliance."
  },
  {
    "type": "mcq",
    "question": "Which of the following security related activities are the responsibility of AWS customers? Choose two options.",
    "options": [
      "Securely dispose faulty disk drives",
      "Installing patches on the network infrastructure",
      "Implementing IM user password policies",
      "Installing patches on the guest operating system",
      "Implementing data center access controls"
    ],
    "answer": "Implementing IM user password policies, Installing patches on the guest operating system",
    "hint": "Customer manages security 'in' the cloud."
  },
  {
    "type": "mcq",
    "question": "Which of the following is one of the major benefits of using elastic compute over your traditional onpremise physical servers?",
    "options": [
      "You can choose the hardware vendor",
      "You get root access to the server",
      "You only pay for what you use",
      "You have the ability of automated backups"
    ],
    "answer": "You only pay for what you use",
    "hint": "Favors variable operational expenditure (OPEX) over capital expenditure (CAPEX)."
  },
  {
    "type": "mcq",
    "question": "Your web application is currently hosted in the US West region in AWS. You need to ensure users all across the world get a seamless user experience when accessing the application. Which of the following service can help achieve this?",
    "options": [
      "AWS Cloud Trail",
      "AWS Route 53",
      "AWS Elastic Load Balancer",
      "AWS CloudFront"
    ],
    "answer": "AWS CloudFront",
    "hint": "Content Delivery Network (CDN) with a global network of edge locations."
  },
  {
    "type": "mcq",
    "question": "Which of the following are features of network ACL in AWS cloud? You need to choose two answers.",
    "options": [
      "They operate at the instance level",
      "They evaluate all rules before allowing traffic",
      "They are stateless",
      "They process rules in order starting with lowest numbered rule when deciding whether to allow traffic",
      "They are stateful"
    ],
    "answer": "They are stateless, They process rules in order starting with lowest numbered rule when deciding whether to allow traffic",
    "hint": "Operate at the subnet level and are stateless."
  },
  {
    "type": "mcq",
    "question": "A company wants to run production workloads on AWS. The company needs concurge service, a designated AWS TAM and technical support that is available 24 hours a day and 7 days a week. Which support plan will meet these requirements?",
    "options": [
      "Basic support",
      "Developer support",
      "Business support",
      "Enterprise support"
    ],
    "answer": "Enterprise support",
    "hint": "Includes concierge service and a designated technical account manager (TAM)."
  },
  {
    "type": "mcq",
    "question": "A company is planning to store their archives in AWS. Which of the following storage mechanism provided by AWS would provide an ideal and cost effective storage option for storing the archive data?",
    "options": [
      "Amazon S3 Glacier",
      "Amazon S3 Standard",
      "Amazon EBS Snapshots",
      "Amazon EBS volumes"
    ],
    "answer": "Amazon S3 Glacier",
    "hint": "Purpose-built for data archiving."
  },
  {
    "type": "mcq",
    "question": "A company wants to have access to scalable, highly reliable and fully managed file storage that runs on the server message block protocol. Which AWS service will meet these requirements?",
    "options": [
      "Amazon S3",
      "Amazon EFS",
      "Amazon EBS",
      "Amazon FSX for Windows file server"
    ],
    "answer": "Amazon FSX for Windows file server",
    "hint": "Managed shared file storage using SMB protocol."
  },
  {
    "type": "mcq",
    "question": "A company wants to improve the overall availability and performance of its application that are hosted on AWS. Which AWS service should the company use?",
    "options": [
      "Amazon Connect",
      "AWS Global Accelerator",
      "Amazon light sale",
      "AWS storage gateway"
    ],
    "answer": "AWS Global Accelerator",
    "hint": "Improves performance and availability with global static public IPs."
  },
  {
    "type": "mcq",
    "question": "You have been running an ondemand EC2 Linux instance for 8 hours 9 minutes and 17 seconds. How much time will you be built for?",
    "options": [
      "9 hours",
      "8 hours",
      "8 hours and 10 minutes",
      "8 hours 9 minutes and 17 seconds"
    ],
    "answer": "8 hours 9 minutes and 17 seconds",
    "hint": "Built in 1-second increments (Linux)."
  },
  {
    "type": "mcq",
    "question": "A company has many multiple business units using the same AWS service to manage their different applications. Which AWS service or tool can the company use to receive volume discounts across multiple AWS accounts?",
    "options": [
      "AWS budgets",
      "Cost explorer",
      "AWS organizations",
      "AWS cost and usage report"
    ],
    "answer": "AWS organizations",
    "hint": "Consolidated billing aggregates usage for volume pricing discounts."
  },
  {
    "type": "mcq",
    "question": "Your application is hosted on Amazon EC2 instances. CPU and RAM requirements of the application rapidly change when bad jobs execute. Which AWS service can be used to dynamically adjust those resources based on demand.",
    "options": [
      "Amazon Route 53",
      "EC2 autoscaling",
      "Amazon elastic container service",
      "Elastic load balancing"
    ],
    "answer": "EC2 autoscaling",
    "hint": "Automatically adds or removes instances using predefined policies."
  },
  {
    "type": "mcq",
    "question": "A company has a many multiple-tier application hosted in AWS. The architecture consists of a web application and database tier. Which of the following AWS services can be used to monitor this architecture?",
    "options": [
      "AWS Cloudatch",
      "VPC flow logs",
      "S3 bucket logs",
      "AWS SQS"
    ],
    "answer": "AWS Cloudatch",
    "hint": "Collects and visualizes logs, metrics, and event data."
  },
  {
    "type": "mcq",
    "question": "Which AWS security service can be used to detect users personal credit card numbers from data stored in a S3 bucket?",
    "options": [
      "Amazon Macy",
      "AWS Shield",
      "Amazon Inspector",
      "Amazon Guard Duty"
    ],
    "answer": "Amazon Macy",
    "hint": "Uses machine learning to discover and protect sensitive data in S3."
  },
  {
    "type": "mcq",
    "question": "A computer customer requires a dedicated technical account manager to support them during critical issues regarding various AWS services. Which support plan should they purchase?",
    "options": [
      "Basic support",
      "Developer support",
      "Business support",
      "Enterprise support"
    ],
    "answer": "Enterprise support",
    "hint": "A dedicated technical account manager (TAM) is exclusive to this plan."
  },
  {
    "type": "mcq",
    "question": "A web administrator maintains several public and private web-based resources for an organization. Which AWS service can they use to keep track of the expiry dates of SSL certificates as well as updating and renewal.",
    "options": [
      "AWS firewall manager",
      "AWS license manager",
      "AWS data life cycle manager",
      "AWS certificate manager"
    ],
    "answer": "AWS certificate manager",
    "hint": "Provisions, manages, and deploys SSL certificates."
  },
  {
    "type": "mcq",
    "question": "Your company wants to move an existing Oracle database to the AWS cloud. Which of the following services can help facilitate this move?",
    "options": [
      "AWS database migration service",
      "AWS trusted advisor",
      "AWS guard duty",
      "AWS inspector"
    ],
    "answer": "AWS database migration service",
    "hint": "Helps move databases quickly, securely, with minimal downtime."
  },
  {
    "type": "mcq",
    "question": "A large enterprise with multiple VPCs in several AWS regions around the world needs to connect and centrally manage network connectivity between its VPCs. Which AWS service or feature meets these requirements?",
    "options": [
      "AWS direct connect",
      "AWS transit gateway",
      "VPC endpoints",
      "AWS siteto-sightVPN"
    ],
    "answer": "AWS transit gateway",
    "hint": "Connects thousands of VPCs and consolidates hybrid connectivity."
  },
  {
    "type": "mcq",
    "question": "A company is launching an application in AWS cloud. The application will use Amazon S3 storage and a large team of researchers will have shared access to the data. The company must be able to recover data that is accidentally overwritten or deleted. Which AWS feature can the company use to meet this requirement?",
    "options": [
      "S3 life cycle configuration",
      "Encryption at rest",
      "S3 versioning",
      "Encryption in transit"
    ],
    "answer": "S3 versioning",
    "hint": "Preserves, retrieves, and restores every version of objects in buckets."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or feature can assist with protecting a website that is hosted outside of AWS?",
    "options": [
      "Amazon VPC route tables",
      "Amazon VPC security groups",
      "AWS web application firewall",
      "Amazon VPC network ACL"
    ],
    "answer": "AWS web application firewall",
    "hint": "Can protect custom origins outside of AWS, typically integrated with CloudFront."
  },
  {
    "type": "mcq",
    "question": "Which AWS feature can be used to launch a preconfigured Amazon EC2 instance?",
    "options": [
      "Amazon Elastic Block Store EBS",
      "Amazon EC2 System Manager",
      "Amazon AppStream 2.0",
      "Amazon Machine Image AMI"
    ],
    "answer": "Amazon Machine Image AMI",
    "hint": "Provides information required to launch an instance, essentially a virtual machine template."
  },
  {
    "type": "mcq",
    "question": "Which of the following needs to be included in total cost of ownership TCO analysis? Choose two options.",
    "options": [
      "Data center security costs",
      "Application development",
      "Hardware acquisition",
      "IT manager salary",
      "Companywide marketing"
    ],
    "answer": "Data center security costs, Hardware acquisition",
    "hint": "Costs directly related to data center facilities and hardware infrastructure."
  },
  {
    "type": "mcq",
    "question": "A company needs to install an application in a Docker container. Which AWS service eliminates the need to provision and manage container hosts?",
    "options": [
      "Amazon EC2",
      "Amazon Elastic Container Services, ECS",
      "AWS Fargate",
      "Amazon FSX for Windows File Server"
    ],
    "answer": "AWS Fargate",
    "hint": "Serverless compute engine for containers."
  },
  {
    "type": "mcq",
    "question": "A company wants to have upto-date information on the AWS service availability. Where can they find this information?",
    "options": [
      "Amazon Cloudatch",
      "AWS Service Health Dashboard",
      "AWS Control Tar",
      "AWS Personal Health Dashboard"
    ],
    "answer": "AWS Service Health Dashboard",
    "hint": "Publicly available health status of all AWS services by region."
  },
  {
    "type": "mcq",
    "question": "The developers in a large organization wants to use an ID to run, test and debug code for Lambda functions. Which AWS service is the most appropriate?",
    "options": [
      "Amazon SDK",
      "AWS Cloud9",
      "AWS Code Commit",
      "AWS Code Deploy"
    ],
    "answer": "AWS Cloud9",
    "hint": "Cloud-based IDE for coding, testing, and debugging."
  },
  {
    "type": "mcq",
    "question": "A group of non- tech friends are looking to set up a website for an upcoming event at a cost effective price with a friendly interface. Which AWS service is the most appropriate to use?",
    "options": [
      "Use AWS light sale",
      "Use AWS marketplace to install a readym made WordPress AMI",
      "Download a preconfigured website on EC2 instance from a third party website",
      "Use a preconfigured customizable Apache web server on an EC2 instance"
    ],
    "answer": "Use AWS light sale",
    "hint": "Build websites with a few clicks with preconfigured applications."
  },
  {
    "type": "mcq",
    "question": "Service control policies SCPs manage permission for which of the following?",
    "options": [
      "AWS organization",
      "Edge locations",
      "AWS regions",
      "Availability zones"
    ],
    "answer": "AWS organization",
    "hint": "Central control over maximum permissions for accounts in an organization."
  },
  {
    "type": "mcq",
    "question": "A company wants to convert audio and video files from their source format into a format that will play on a smartphones, tablets, and web browsers. Which AWS service can be used to meet these requirements?",
    "options": [
      "Amazon Recognization",
      "Amazon Comprehend",
      "AWS Glue",
      "Amazon Elastic Transcodor"
    ],
    "answer": "Amazon Elastic Transcodor",
    "hint": "Scalable, cost-effective media transcoding in the cloud."
  },
  {
    "type": "mcq",
    "question": "Which AWS service supports a hybrid architecture that gives users the ability to extend AWS infrastructure, AWS services, APIs and tools to data centers, collocation environments or onpremise facilities.",
    "options": [
      "AWS Fargate",
      "AWS Local Zones",
      "AWS Outposts",
      "AWS Snowmobile"
    ],
    "answer": "AWS Outposts",
    "hint": "Extend AWS infrastructure and services to almost any on-premise location."
  },
  {
    "type": "mcq",
    "question": "Which AWS service lets you convert text into speech?",
    "options": [
      "Amazon Kendra",
      "Amazon Poly",
      "Amazon Connect",
      "Amazon Recognition"
    ],
    "answer": "Amazon Poly",
    "hint": "Deep learning technologies to synthesize natural sounding human speech."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or tool can be used to capture information about inbound and outbound traffic in an Amazon VPC?",
    "options": [
      "VPC flow logs",
      "Amazon inspector",
      "NAT gateway",
      "VPC endpoint services"
    ],
    "answer": "VPC flow logs",
    "hint": "Captures IP traffic going to and from network interfaces."
  },
  {
    "type": "mcq",
    "question": "Which AWS service provides a managed software version control system?",
    "options": [
      "AWS data sync",
      "AWS code pipeline",
      "AWS codecommit",
      "Amazon code deploy"
    ],
    "answer": "AWS codecommit",
    "hint": "Fully managed source control service that hosts private Git repositories."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service can be used to provide root storage volumes to Amazon EC2 instances?",
    "options": [
      "Amazon EBS",
      "Amazon EFS",
      "Amazon S3",
      "Amazon machine image"
    ],
    "answer": "Amazon EBS",
    "hint": "Block-based root volumes that persist data beyond instance termination."
  },
  {
    "type": "mcq",
    "question": "An IM user must be granted access to an Amazon S3 bucket using a bucket policy. Which element in the S3 bucket policy should be updated to define the user account for which access will be granted.",
    "options": [
      "Condition",
      "Action",
      "Resource",
      "Principle"
    ],
    "answer": "Principle",
    "hint": "Specifies the principle (user, account, role) allowed or denied access."
  },
  {
    "type": "mcq",
    "question": "In which situations should a company create an IM user instance instead of an IM role? You have to choose two options.",
    "options": [
      "When users are authenticated in the corporate network and want to be able to use AWS without having to sign in a second time",
      "When an application that runs on Amazon EC2 instances requires access to other services",
      "When the company needs to add users to IM groups",
      "When the company creates AWS access credentials for individuals",
      "When the company creates an application that runs on a mobile phone that makes requests to AWS"
    ],
    "answer": "When the company needs to add users to IM groups, When the company creates AWS access credentials for individuals",
    "hint": "IAM users are for distinct identities with long-term credentials."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the best practice for managing AWS IM access keys?",
    "options": [
      "There is no need to manage access keys",
      "AWS rotates access keys on a schedule",
      "Use IM roles instead of access keys",
      "Customer should rotate the keys regularly"
    ],
    "answer": "Customer should rotate the keys regularly",
    "hint": "Protect resources by rotating keys, typically every 90 days."
  },
  {
    "type": "mcq",
    "question": "A cloud engineer expects an increase in application traffic at a particular time when the application go live is planned. How can the cloud engineer ensure Amazon EC2 autoscaling allocates the desired number of EC2 instances ahead of go live?",
    "options": [
      "Configure a scheduled scaling policy",
      "Configure a target tracking scaling policy",
      "Configure a step scaling policy",
      "Configure predictive scaling"
    ],
    "answer": "Configure a scheduled scaling policy",
    "hint": "Scaling schedule based on predictable load changes."
  },
  {
    "type": "mcq",
    "question": "Which AWS service can be used to host a static website?",
    "options": [
      "Amazon Elastic File System",
      "Amazon Elastic Block Store",
      "Amazon Route 53",
      "Amazon S3"
    ],
    "answer": "Amazon S3",
    "hint": "Capable of hosting individual web pages with static content."
  },
  {
    "type": "mcq",
    "question": "Which of the following are recommended security measures when creating access to an AWS account? You need to choose two options.",
    "options": [
      "Enable multiffactor authentication",
      "Grant admin privilege access",
      "Enable cloud trail logs",
      "Grant least privilege privilege access"
    ],
    "answer": "Enable multiffactor authentication, Grant least privilege privilege access",
    "hint": "IAM best practices focus on multi-factor authentication (MFA) and minimum required access."
  },
  {
    "type": "mcq",
    "question": "Amazon EC2 web servers connect to a traditional application operating in a corporate data center. Which phrase would be appropriate to describe this model?",
    "options": [
      "Cloudnative",
      "Hybrid architecture",
      "Partner network",
      "Infrastructure as a service"
    ],
    "answer": "Hybrid architecture",
    "hint": "Combines public and private cloud/on-premise resources."
  },
  {
    "type": "mcq",
    "question": "A cloud engineer is required to retain data for 7 years in order to comply with regulatory standards. Which AWS service meets this need for the least amount of money?",
    "options": [
      "Amazon S3",
      "AWS Snowball",
      "Amazon Red Shift",
      "Amazon S3 Glacier"
    ],
    "answer": "Amazon S3 Glacier",
    "hint": "S3 Glacier Deep Archive is lowest cost archive storage designed for 7-10+ years retention."
  },
  {
    "type": "mcq",
    "question": "Which of the following should be provided by users to utilize the AWS CLI?",
    "options": [
      "Certificate",
      "Password",
      "Access and secret key",
      "API key"
    ],
    "answer": "Access and secret key",
    "hint": "Programmatic credentials for command line interface access."
  },
  {
    "type": "mcq",
    "question": "Which of the following statements most accurately characterize elastic load balancing?",
    "options": [
      "It collects metrics of connected Amazon EC2 instances",
      "It distributes incoming application traffic across one or more Amazon EC2 instances",
      "It translates a domain name into an IP address using DNS",
      "It automatically adjusts the number of Amazon EC2 instances to support incoming traffic"
    ],
    "answer": "It distributes incoming application traffic across one or more Amazon EC2 instances",
    "hint": "Distributes incoming application traffic across multiple targets."
  },
  {
    "type": "mcq",
    "question": "A corporation is developing a mobile application to give its clients with shopping recommendations. The business intends to include a graph database into the shopping recommendation engine. Which AWS database service should the business use?",
    "options": [
      "Amazon Neptune",
      "Amazon Document DB",
      "Amazon Aurora",
      "Amazon Dynamo DB"
    ],
    "answer": "Amazon Neptune",
    "hint": "A graph database purpose-built for building graph applications."
  },
  {
    "type": "mcq",
    "question": "Which Dynamo DB feature can be used to reduce the latency of request to a database from milliseconds to microsconds?",
    "options": [
      "Dynamob accelerator",
      "Read replica",
      "Memcache",
      "Multi-AZ deployment"
    ],
    "answer": "Dynamob accelerator",
    "hint": "A fully managed highly available in-memory cache for DynamoDB."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the most appropriate means for developers to store Docker container images in the AWS cloud?",
    "options": [
      "Elastic container service",
      "Elastic block store",
      "Elastic container registry",
      "Elastic map reduce"
    ],
    "answer": "Elastic container registry",
    "hint": "A fully managed container registry for deployment images and artifacts."
  },
  {
    "type": "mcq",
    "question": "Which AWS service can be used to send alerts based on Amazon Cloudatch alarms?",
    "options": [
      "AWS cloud trail",
      "Amazon simple notification service",
      "AWS trusted advisor",
      "Amazon Route 53"
    ],
    "answer": "Amazon simple notification service",
    "hint": "Used for both Application-to-Application (A2A) and Application-to-Person (A2P) notifications."
  },
  {
    "type": "mcq",
    "question": "Which AWS hybrid storage service enables onpremise applications to seamlessly use AWS cloud storage through standard file storage protocols.",
    "options": [
      "AWS Direct Connect",
      "AWS Snowmobile",
      "AWS Snowball Edge",
      "AWS Storage Gateway"
    ],
    "answer": "AWS Storage Gateway",
    "hint": "Hybrid cloud storage giving on-premise access to cloud storage."
  },
  {
    "type": "mcq",
    "question": "Which statement is true in relation to data stored within an AWS region?",
    "options": [
      "Data is automatically archived after 90 days",
      "Data is not replicated outside of a region unless you configure it",
      "Data is always automatically replicated to at least one other availability zone",
      "Data is always replicated to another region"
    ],
    "answer": "Data is not replicated outside of a region unless you configure it",
    "hint": "Customers must configure data replication based on compliance and network latency."
  },
  {
    "type": "mcq",
    "question": "Which team is available to support AWS customers on an enterprise support plan with account issues?",
    "options": [
      "AWS billing and accounts",
      "AWS concarch",
      "AWS technical support",
      "AWS technical account manager"
    ],
    "answer": "AWS concarch",
    "hint": "Billing and account experts included as part of the Enterprise Support plan."
  },
  {
    "type": "mcq",
    "question": "Which AWS service lets you add user signup, sign in, and access control to web and mobile apps?",
    "options": [
      "AWS Cloud HSM",
      "AWS Artifact",
      "Amazon Cognito",
      "AWS Directory Services"
    ],
    "answer": "Amazon Cognito",
    "hint": "Supports social and enterprise identity federation and includes advanced security features."
  },
  {
    "type": "mcq",
    "question": "What is the main benefit of the principle of use coupling?",
    "options": [
      "Reduce interdependencies so a failure in one component does not cascade to other components",
      "Reduce operational complexity",
      "Enables applications to scale automatically based on current demand",
      "Automate the deployment of infrastructure using code"
    ],
    "answer": "Reduce interdependencies so a failure in one component does not cascade to other components",
    "hint": "Loose coupling limiting interconnections to simplify testing, maintenance, and troubleshooting."
  },
  {
    "type": "mcq",
    "question": "AWS acceptable use policy for penetration testing allows which of the following?",
    "options": [
      "Customers can carry out security assessments or penetration tests against their AWS infrastructure after obtaining authorization from AWS",
      "Authorized security accessors to perform penetration tests against AWS customer without authorization",
      "AWS to perform penetration testing against customer resources without notification",
      "Customers to carry out security assessments or penetration tests against their AWS infrastructure without prior approval for selected services"
    ],
    "answer": "Customers to carry out security assessments or penetration tests against their AWS infrastructure without prior approval for selected services",
    "hint": "No prior approval needed for selected services like EC2, RDS, CloudFront."
  },
  {
    "type": "mcq",
    "question": "The DevOps team in your organization is keen to explore a AWS service which can be used to manage infrastructure as a code. Which of the following can be used to meet this requirement?",
    "options": [
      "AWS Inspector",
      "AWS config",
      "AWS cloud formation",
      "AWS trusted advisor"
    ],
    "answer": "AWS cloud formation",
    "hint": "Cloudformation treats infrastructure as code."
  },
  {
    "type": "mcq",
    "question": "Which feature of AWS IM enables you to identify unnecessary permissions that have been assigned to users?",
    "options": [
      "Role advisor",
      "Access advisor",
      "Group advisor",
      "Permissions advisor"
    ],
    "answer": "Access advisor",
    "hint": "Shows the last timestamp when an IAM entity accessed an AWS service."
  },
  {
    "type": "mcq",
    "question": "A web application running on AWS has been receiving malicious requests from the same set of IP addresses. Which AWS service can help secure the application and block the malicious traffic?",
    "options": [
      "Amazon Inspector",
      "Amazon Guard Duty",
      "AWS VF",
      "AWS IM"
    ],
    "answer": "AWS VF",
    "hint": "Web ACLs with rules based on IP address, size, and more."
  },
  {
    "type": "mcq",
    "question": "Which type of elastic load balancer operates at level four which is transport layer of the OSI model?",
    "options": [
      "Application load balancer",
      "Classic load balancer",
      "Amazon route 53 load balancer",
      "Network load balancer"
    ],
    "answer": "Network load balancer",
    "hint": "Functions at the transport layer of open systems interconnection model."
  },
  {
    "type": "mcq",
    "question": "A cloud engineer wants to bootstrap an EC2 instance. How can the engineer achieve this?",
    "options": [
      "Utilize AWS config",
      "Build metadata",
      "Utilize user data",
      "Run command"
    ],
    "answer": "Utilize user data",
    "hint": "Pass shell scripts or cloud-init directives during instance launch."
  },
  {
    "type": "mcq",
    "question": "Which of the below statements regarding Amazon S3 buckets is accurate? You need to choose two options.",
    "options": [
      "Bucket names must be unique globally",
      "Buckets are replicated globally",
      "Bucket names must be unique regionally",
      "Buckets are region specific",
      "You can have nested buckets"
    ],
    "answer": "Bucket names must be unique globally, Buckets are region specific",
    "hint": "Global uniqueness in names and specific location for buckets."
  },
  {
    "type": "mcq",
    "question": "Which of the following is an AWS domain name system DNS web service?",
    "options": [
      "Amazon Route 53",
      "AWS Snowball",
      "Amazon light sale",
      "AWS Direct Connect"
    ],
    "answer": "Amazon Route 53",
    "hint": "Highly available and scalable domain name system."
  },
  {
    "type": "mcq",
    "question": "Which of the following services have distributed denial of service attack mitigation features? You need to choose two options.",
    "options": [
      "AWS web",
      "AWS KMS",
      "AWS cloud trail",
      "Amazon Route 53"
    ],
    "answer": "AWS web, Amazon Route 53",
    "hint": "Includes WAF, shield and other mitigation integrated services."
  },
  {
    "type": "mcq",
    "question": "Which of the following Amazon EC2 pricing model for reserved instances gives the highest discount?",
    "options": [
      "No upfront payment for a three-year term",
      "All upfront payment for a one-year term",
      "Partial upfront for a one-year term",
      "All upfront payment for a three-year term"
    ],
    "answer": "All upfront payment for a three-year term",
    "hint": "One upfront payment gives the largest discount."
  },
  {
    "type": "mcq",
    "question": "Where can you find software listings from independent software vendors that make it easy to find, test, buy, and deploy softwares that run on AWS?",
    "options": [
      "AWS Marketplace",
      "AWS Glue",
      "Amazon Athena",
      "AWS Cloud Search"
    ],
    "answer": "AWS Marketplace",
    "hint": "A curated digital catalog with simplified procurement and controls."
  },
  {
    "type": "mcq",
    "question": "You want to be notified when your AWS usage costs exceed or are forecasted to exceed a specific dollar amount. Which of the following AWS services can be used to achieve this requirement?",
    "options": [
      "AWS cloud cost explorer",
      "AWS budgets",
      "AWS trusted advisor",
      "AWS quicksite"
    ],
    "answer": "AWS budgets",
    "hint": "Monitor AWS spend with alerts on desired limits."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the design principle for operational excellence under the AWS well architected framework pillars?",
    "options": [
      "Apply security at all layers",
      "Stop guessing capacity",
      "Go global in minutes",
      "Learn from all operational failures"
    ],
    "answer": "Learn from all operational failures",
    "hint": "Includes learning from operational failures and making small, frequent, reversible changes."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the fully managed track, transform and load service that helps AWS customers to prepare and load their data for analytics.",
    "options": [
      "AWS Lambda",
      "AWS Athena",
      "AWS Glue",
      "AWS Direct Connect"
    ],
    "answer": "AWS Glue",
    "hint": "A serverless data integration service."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services in combination can be used to serve large amounts of online video content with least possible latency. You have to choose two options.",
    "options": [
      "AWS storage gateway",
      "Amazon EFS",
      "Amazon S3",
      "Amazon Glacier",
      "Amazon CloudFront"
    ],
    "answer": "Amazon S3, Amazon CloudFront",
    "hint": "Speeds up content delivery by caching close to end-users (CloudFront fetches from origins like S3)."
  },
  {
    "type": "mcq",
    "question": "Which AWS service automatically detects impaired Amazon EC2 instances and replaces the instances without manual intervention?",
    "options": [
      "AWS Lambda",
      "AWS Cognto",
      "Elastic Load Balancer",
      "Amazon EC2 Autoscaling"
    ],
    "answer": "Amazon EC2 Autoscaling",
    "hint": "Amazon autoscaling launches a new replacement instance when healthy ones fail."
  },
  {
    "type": "mcq",
    "question": "Your organization needs to use their existing licenses for Microsoft Windows and SQL Server while also addressing strict corporate compliance requirements. Which EC2 pricing model would you recommend?",
    "options": [
      "Reserved instance",
      "Spot instances",
      "Dedicated hosts",
      "Savings plan"
    ],
    "answer": "Dedicated hosts",
    "hint": "Integrated with License Manager for BYOL (bring your own license) scenarios."
  },
  {
    "type": "mcq",
    "question": "Which of the following is AWS fully managed relational database engine that is compatible with MySQL and Post SQL and can deliver up to five times the throughput of MySQL.",
    "options": [
      "Amazon Aurora",
      "AWS RDS",
      "AWS Dynamob",
      "Amazon Red Shift"
    ],
    "answer": "Amazon Aurora",
    "hint": "Performance and availability of commercial grade databases at lower cost."
  },
  {
    "type": "mcq",
    "question": "John is setting up the infrastructure for a web application that requires multiple EC2 instances to handle the expected demand. However, when testing the application, he discovers all the traffic is routed to only one of the servers. Which AWS feature should he add to his application in order to evenly distribute traffic among all servers?",
    "options": [
      "Autoscaling",
      "Elastic load balancer",
      "Route 53",
      "Amazon CloudFront"
    ],
    "answer": "Elastic load balancer",
    "hint": "Evenly distributes traffic between targets within one or more AZs."
  },
  {
    "type": "mcq",
    "question": "How can a company configure automatic asynchronous copying of objects in Amazon S3 bucket across regions?",
    "options": [
      "Using cross region replication",
      "By configuring multim masteraster replication",
      "Using life cycle actions",
      "This is done by default by AWS"
    ],
    "answer": "Using cross region replication",
    "hint": "Allows replication across different AWS regions or same region."
  },
  {
    "type": "mcq",
    "question": "How can a database administrator reduce the operational overhead for a MySQL database?",
    "options": [
      "Migrate the database onto an Amazon EC2 instance",
      "Use AWS Cloud for manage operations",
      "Migrate the database onto AWS Lambda",
      "Migrate the database onto Amazon RDS instance"
    ],
    "answer": "Migrate the database onto Amazon RDS instance",
    "hint": "Managed relational database service including MySQL, reduced operational overhead."
  },
  {
    "type": "mcq",
    "question": "Which feature of AWS allows you to deploy a new application for which the requirements may change over time?",
    "options": [
      "Operational excellence",
      "High availability",
      "Fault tolerance",
      "Elasticity"
    ],
    "answer": "Elasticity",
    "hint": "Acquire or release resources without worrying about future needs."
  },
  {
    "type": "mcq",
    "question": "Which AWS service allows you to for building and integrating loosely coupled distributed applications?",
    "options": [
      "Amazon EBS",
      "Amazon SNS",
      "Amazon EFS",
      "Amazon RDS"
    ],
    "answer": "Amazon SNS",
    "hint": "Works with other notification/queuing services for loosely coupled distributed application integration."
  },
  {
    "type": "mcq",
    "question": "which AWS service allows you to use blockbased volumes on premise that are then asynchronously backed up to Amazon S3.",
    "options": [
      "AWS storage gateway volume gateway",
      "AWS storage gateway file gateway",
      "Amazon S3 transfer acceleration",
      "Amazon S3 multiart upload"
    ],
    "answer": "AWS storage gateway volume gateway",
    "hint": "Allows primary data local storage, with S3 backup."
  },
  {
    "type": "mcq",
    "question": "Your management is looking to deploy a shared file access on AWS. Hundreds of EC2 instances will access the file system simultaneously and will need pabytes of data storage. Which AWS service is best option in this case?",
    "options": [
      "Amazon EC2",
      "Amazon EBS",
      "Amazon EFS",
      "Amazon S3"
    ],
    "answer": "Amazon EFS",
    "hint": "File systems that scale automatically to pabytes without provisioning storage."
  },
  {
    "type": "mcq",
    "question": "Choose the best Amazon Route 53 routing policy that can route traffic to multiple resources based on the end user's location.",
    "options": [
      "Failover routing policy",
      "Simple routing policy",
      "Latency routing policy",
      "Geoloccation routing policy"
    ],
    "answer": "Geoloccation routing policy",
    "hint": "Routes based on the user's geographical location."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services can an organization use to automate operational tasks on EC2 instances using existing Chef cookbooks?",
    "options": [
      "AWS config",
      "AWS service catalog",
      "AWS ops works",
      "AWS code deploy"
    ],
    "answer": "AWS ops works",
    "hint": "Configuration management service providing managed instances of Chef and Puppet."
  },
  {
    "type": "mcq",
    "question": "Which AWS service can be used to automate the provisioning of infrastructure and administrative tasks for an analytical data warehouse?",
    "options": [
      "Amazon Red Shift",
      "Amazon Sage Maker",
      "Amazon Open Search",
      "Amazon Quicksite"
    ],
    "answer": "Amazon Red Shift",
    "hint": "Pabyte-scale analytical data warehouse solution in the cloud."
  },
  {
    "type": "mcq",
    "question": "Which of the following features can be used to preview the changes to be made to an AWS resource when using the AWS cloud for template?",
    "options": [
      "AWS cloud for stack sets",
      "AWS cloud for change sets",
      "AWS cloud for drift detection",
      "AWS cloud for intrinsic functions"
    ],
    "answer": "AWS cloud for change sets",
    "hint": "Preview impact of proposed stack changes on running resources."
  },
  {
    "type": "mcq",
    "question": "A weather tracking website monitors the weather along the fright road. This information is used by travelers around the world to plan their trip. Travelers are expecting quick turnaround time when booking flights and viewing the weather. This website is using Amazon route 53DNS which is the best routing policy for the website.",
    "options": [
      "Failover failover routing policy",
      "Geoloccation routing policy",
      "Latency based routing policy",
      "Weighted routing policy"
    ],
    "answer": "Latency based routing policy",
    "hint": "Routes users to the resources that provide the lowest network latency."
  },
  {
    "type": "mcq",
    "question": "What can be termed as a userdefined label that has a key value pair of variable character length which is assigned to AWS resources as metadata for administration and management purposes.",
    "options": [
      "Tag key",
      "Resource flag",
      "Resource tag",
      "Resource group"
    ],
    "answer": "Resource tag",
    "hint": "Metadata assignments for manage, identify, and categorize resources."
  },
  {
    "type": "mcq",
    "question": "Which of the following services can be used to investigate and analyze the root cause of potential security threat to AWS resources?",
    "options": [
      "AWS Shield",
      "Amazon Detective",
      "Amazon Guard Duty",
      "AWS Security Hub"
    ],
    "answer": "Amazon Detective",
    "hint": "Analyzes and visualizes security data from multi sources to identify root cause of security threat."
  },
  {
    "type": "mcq",
    "question": "Which of the following is a secure isolated networking component that can be used to host EC2 resources in the AWS cloud?",
    "options": [
      "AWS VPC",
      "AWS EKS",
      "AWS NCL",
      "AWS ECS"
    ],
    "answer": "AWS VPC",
    "hint": "Isolated networking resembling on-premise networks."
  },
  {
    "type": "mcq",
    "question": "Your web application is deployed in the Ohio region. The website is now planned to be distributed to other regions and you plan to use CloudFront for global distribution. What statements about CloudFront are false? You need to choose two option.",
    "options": [
      "CloudFront can help improve performance by using keep alive connections between edge locations and origin server",
      "CloudFront uses the concept of edge locations for caching and delivering content faster for its users",
      "CloudFront doesn't cache dynamic content",
      "CloudFront can use only S3 buckets as their origin server from which they cache content"
    ],
    "answer": "CloudFront doesn't cache dynamic content, CloudFront can use only S3 buckets as their origin server from which they cache content",
    "hint": "Serving dynamic content and from different type origins is not true for cloud front."
  },
  {
    "type": "mcq",
    "question": "A number of large objects from different geographical locations need to be uploaded to an S3 bucket. Which is the fastest and most reliable way to accomplish this?",
    "options": [
      "You can directly access the S3 bucket from the different locations and use a multi-art upload for transferring huge objects",
      "You can use S3 transfer acceleration from each geographic location for transferring data quickly",
      "You can use a direct connect link from each of the geographic locations for transferring data quickly",
      "You can connect to an application running on AWS EC2 that is hosted in multiple regions using Route 53 and use latency based routing to upload files to S3 bucket"
    ],
    "answer": "You can use S3 transfer acceleration from each geographic location for transferring data quickly",
    "hint": "Fast network infrastructure bypassing much of internet for delivering content to S3 destinations."
  },
  {
    "type": "mcq",
    "question": "Which two functions can be performed using Amazon Route 53? You need to choose two right answers.",
    "options": [
      "Connect user requests to AWS infrastructure",
      "Create and manage cryptographic keys",
      "Transfer DNS records for domain names from other registars",
      "Connect an onpremise data center directly to AWS via fiber optic cables"
    ],
    "answer": "Connect user requests to AWS infrastructure, Transfer DNS records for domain names from other registars",
    "hint": "Highly available DNS service connecting user request to AWS infrastructure."
  },
  {
    "type": "mcq",
    "question": "You have deployed your application on multiple Amazon EC2 instances. Your customer complain that sometimes they can't reach the application. Which AWS service allows you to monitor the performance of your EC2 instances to assist in troubleshooting these issues?",
    "options": [
      "AWS Cloud Trail",
      "AWS Config",
      "Amazon Cloudatch",
      "AWS Lambda"
    ],
    "answer": "Amazon Cloudatch",
    "hint": "Monitoring and management service for AWS hybrid and on-premise applications and infrastructure resources."
  },
  {
    "type": "mcq",
    "question": "A company is deploying a new two-tier web application in AWS. Where should the most frequently accessed data be stored so that the application's response time is optimal?",
    "options": [
      "AWS storage gateway",
      "Amazon EBS volume",
      "AWS Ops works",
      "Amazon Elastic Cacher"
    ],
    "answer": "Amazon Elastic Cacher",
    "hint": "In-memory caching service supporting multiple relational databases. Accelerated application and database performance."
  },
  {
    "type": "mcq",
    "question": "A company wants to set up a domain name system, DNS record for its application with a failover routing policy that is based on health checks. Which AWS service or resource should the company use to achieve this goal?",
    "options": [
      "Amazon Kendra",
      "Application load balancer",
      "Amazon Route 53",
      "AWS RAF"
    ],
    "answer": "Amazon Route 53",
    "hint": "AWS DNS service that can use to route traffic with failover routing based on health checks."
  },
  {
    "type": "mcq",
    "question": "A business wants to provide a user access to an Amazon S3 bucket. Which element of S3 bucket policy contains information about the users who need access to the bucket?",
    "options": [
      "Principle",
      "Action",
      "Resource",
      "Effect"
    ],
    "answer": "Principle",
    "hint": "Principle element in S3 bucket policy is allowed or denied access to a resource."
  },
  {
    "type": "mcq",
    "question": "A company plans to migrate its custom marketing and order processing application to AWS. The company needs to deploy the application on different type of instances with various configurations of CPU, memory and networking capacity. Which AWS service should the company use to meet these requirements?",
    "options": [
      "Amazon Athena",
      "Amazon EC2",
      "AWS Lambda",
      "Amazon Cognto"
    ],
    "answer": "Amazon EC2",
    "hint": "Flexibility to choose different types of configurations, in terms of CPU, RAM and networking."
  },
  {
    "type": "mcq",
    "question": "Which service provides a virtually unlimited amount of online highly durable object storage?",
    "options": [
      "Amazon S3",
      "Amazon Red Shift",
      "Amazon Elastic Container Service",
      "Amazon Elastic File System"
    ],
    "answer": "Amazon S3",
    "hint": "Virtually unlimited highly durable object storage."
  },
  {
    "type": "mcq",
    "question": "Which AWS service provides a simple and scalable shared file storage solution for use with Linux- based AWS and on-premise servers.",
    "options": [
      "Amazon S3",
      "Amazon Glacier",
      "Amazon EBS",
      "Amazon EFS"
    ],
    "answer": "Amazon EFS",
    "hint": "File storage solution for use with Linux based AWS and on premise servers."
  },
  {
    "type": "mcq",
    "question": "Which of the following components of AWS infrastructure consists of one or more discrete data centers interconnected through low latency links?",
    "options": [
      "Edge location",
      "Availability zone",
      "Region",
      "AWS private link"
    ],
    "answer": "Availability zone",
    "hint": "Consists of one or more discrete data centers with redundant part networking."
  },
  {
    "type": "mcq",
    "question": "What approach of transcoding a large number of individual video files adheres to AWS architecture principles?",
    "options": [
      "Using many instances in parallel",
      "Using dedicated hardware",
      "Using a single large instance during of peak hours",
      "Using a large GPU instance type"
    ],
    "answer": "Using many instances in parallel",
    "hint": "Using multiple instances in parallel is more faster and adhere to AWS architecture principle of multithreading."
  },
  {
    "type": "mcq",
    "question": "You are tasked with finding a lowcost long-term solution for data backups. Which AWS service would you choose as a solution?",
    "options": [
      "Amazon EBS",
      "Amazon RDS",
      "Amazon S3 Glacier",
      "AWS Snowball"
    ],
    "answer": "Amazon S3 Glacier",
    "hint": "Purpose-built for data archiving. Long term back up solution."
  },
  {
    "type": "mcq",
    "question": "Which of the following is AWS sole responsibility when talking about AWS shared responsibility model?",
    "options": [
      "Managing IM policies",
      "Physical data center security",
      "Amazon S3 bucket policies",
      "Auditing AWS cloud trail logs"
    ],
    "answer": "Physical data center security",
    "hint": "AWS is responsible for physical security of data centers."
  },
  {
    "type": "mcq",
    "question": "Which of the following disaster recovery scenarios offers the lowest possibility of downtime?",
    "options": [
      "Backup and restore",
      "Warm standby",
      "Pilot light",
      "Multi-sight, active active"
    ],
    "answer": "Multi-sight, active active",
    "hint": "Data and systems can be restored using multiple Variant."
  },
  {
    "type": "mcq",
    "question": "Which methods can be used to identify AWS costs by departments? You need to choose two options.",
    "options": [
      "Create separate accounts for each department",
      "Use reserved instances where possible",
      "Enable multiffactor authentication for root user",
      "Use tags to associate each instance with a particular department",
      "pay bills using purchase orders"
    ],
    "answer": "Create separate accounts for each department, Use tags to associate each instance with a particular department",
    "hint": "Consolidated billing feature in AWS can use to separate accounts for each department and use tags for volume processing discounts."
  },
  {
    "type": "mcq",
    "question": "Which of the following is AWS responsibility in the AWS shared responsibility model?",
    "options": [
      "Updating the security group rules to block traffic to vulnerable ports",
      "Updating the network ACL to block traffic to vulnerable ports",
      "Updating the firmware of the underlying EC2 hosts",
      "Patching operating system running on Amazon EC2 instances"
    ],
    "answer": "Updating the firmware of the underlying EC2 hosts",
    "hint": "AWS is responsible to underlying hardware and host firmware up to date."
  },
  {
    "type": "mcq",
    "question": "What tasks should a customer perform when they suspect an AWS account has been compromised? You need to choose two options.",
    "options": [
      "Remove MFA tokens",
      "Rotate passwords and access keys",
      "Move resources to a different AWS region",
    "Delete AWS cloud trail logs",
      "Contact AWS support"
    ],
    "answer": "Rotate passwords and access keys, Contact AWS support",
    "hint": "In case account compromise customer should change the password and update access keys. Contact AWS support."
  },
  {
    "type": "mcq",
    "question": "How do Amazon EC2 autoscaling help achieve high availability for a web application?",
    "options": [
      "They enable the application static content to reside closer to end users",
      "They automatically add more instances across multiple AWS regions based on global demand on the application",
      "They are able to distribute incoming requests across a tier of web server instances",
      "They automatically add or replace instances across multiple availability zone when the application needs it"
    ],
    "answer": "They automatically add or replace instances across multiple availability zone when the application needs it",
    "hint": "Amazon EC2 autoscaling maintain application availability."
  },
  {
    "type": "mcq",
    "question": "A user is able to set up a masterpayer account to view consolidated billing using which of the following AWS service?",
    "options": [
      "AWS budgets",
      "Amazon Macy",
      "AWS organizations",
      "Amazon Quicksite"
    ],
    "answer": "AWS organizations",
    "hint": "Capability to centrally manage and govern a cloud environment."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service or feature allows user to connect with and deploy AWS services programmatically?",
    "options": [
      "AWS Cloud9",
      "AWS management console",
      "AWS code pipeline",
      "AWS software development kits, SDKs"
    ],
    "answer": "AWS software development kits, SDKs",
    "hint": "Can use programmatically for virtually any type of application and easy to trigger."
  },
  {
    "type": "mcq",
    "question": "A company wants to migrate a critical application to AWS. The application has a short runtime. The application is invoked by changes in data or by shifts in system state. The the company needs a compute solution that maximizes operational efficiency and minimizes the cost of running the application. Which AWS solution should the company use to meet these requirements?",
    "options": [
      "AWS Lambda",
      "Amazon EC2 reserved instances",
      "EC2 spot instances",
      "EC2 ondemand instances"
    ],
    "answer": "AWS Lambda",
    "hint": "Serverless, short runtime with different type of trigger invocation."
  },
  {
    "type": "mcq",
    "question": "A company plans to create a data lake that uses Amazon S3. Which factor will have the most effect on cost?",
    "options": [
      "Charges to transfer existing data into Amazon S3",
      "The selection of S3 storage tiers",
      "S3 inest fees for each request",
      "The addition of S3 bucket policies"
    ],
    "answer": "The selection of S3 storage tiers",
    "hint": "Pricing tier varies according to the selection of S3 storage class used in data lake."
  },
  {
    "type": "mcq",
    "question": "How does the AWS cloud pricing model differ from the traditional onpremise storage pricing model?",
    "options": [
      "There are no upfront cost commitments",
      "There are no infrastructure operating costs",
      "AWS resources do not incur costs",
      "There are no software licensing costs"
    ],
    "answer": "There are no upfront cost commitments",
    "hint": "Trade fixed expense for variable expense, no upfront cost in traditional on premise data centers."
  },
  {
    "type": "mcq",
    "question": "A company is developing a mobile app that needs a higherformance NoSQL database. Which AWS service should the company use for this database? You need to choose the two options.",
    "options": [
      "Amazon RDS",
      "Amazon Aurora",
      "Amazon Document DB with MongoDB compatibility",
      "Amazon Red Shift",
      "Amazon Dynamob"
    ],
    "answer": "Amazon Document DB with MongoDB compatibility, Amazon Dynamob",
    "hint": "Mobile apps requires high performance NoSQL database."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or tool should a company use to centrally request and track service limit increases?",
    "options": [
      "AWS service catalog",
      "AWS budgets",
      "AWS config",
      "Service kotas"
    ],
    "answer": "Service kotas",
    "hint": "Service code console. Tracks service limits with different usage of data."
  },
  {
    "type": "mcq",
    "question": "A company wants to launch its workload on AWS and requires the system to automatically recover from failure. Which pillar of the AWS well architected framework includes this requirement?",
    "options": [
      "Operational excellence",
      "Performance, efficiency",
      "Reliability",
      "Cost optimization"
    ],
    "answer": "Reliability",
    "hint": "Design principle to scale horizontally to increase availability, automates recovery."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service uses edge locations?",
    "options": [
      "AWS Global Accelerator",
      "Amazon Connect",
      "Amazon Aurora",
      "AWS Outposts"
    ],
    "answer": "AWS Global Accelerator",
    "hint": "Content delivery network to serve dynamic content."
  },
  {
    "type": "mcq",
    "question": "A company has a single Amazon EC2 instance. The company wants to adopt a highly available architecture. What can the company do to meet this requirement?",
    "options": [
      "Change the EC2 instance family to a compute optimized instance",
      "Scale vertically to a larger EC2 instance size",
      "Scale horizontally across multiple availability zones",
      "Purchase an EC2 dedicated instance"
    ],
    "answer": "Scale horizontally across multiple availability zones",
    "hint": "Highly available architecture across availability zones."
  },
  {
    "type": "mcq",
    "question": "A company is preparing to launch a new web store that is expected to receive high traffic for an upcoming event. The web store runs only on AWS and the company has an AWS enterprise support plan. Which AWS resource will provide guidance about how the company should scale its architecture and operational support during the event?",
    "options": [
      "The designated AWS technical account manager also called as TAM",
      "AWS abuse team",
      "AWS professional services",
      "AWS infrastructure event management"
    ],
    "answer": "AWS infrastructure event management",
    "hint": "Infrastructure event management offers architecture and scaling guidance and operational support."
  },
  {
    "type": "mcq",
    "question": "A company wants to limit its employee AWS access to a portfolio of predefined AWS resources. Which AWS solution should the company use to meet this requirement?",
    "options": [
      "AWS software development kit",
      "AWS service catalog",
      "AWS apps sync",
      "AWS config"
    ],
    "answer": "AWS service catalog",
    "hint": "Capability to automatically remove resources, centrally manage for governance."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services lets connect devices easily and securely interact with cloud applications and other devices?",
    "options": [
      "AWS IoT core",
      "Amazon SNS",
      "AWS directory service",
      "Amazon Cognito"
    ],
    "answer": "AWS IoT core",
    "hint": "A web service that makes it easy to set up and securely interact with connected devices."
  },
  {
    "type": "mcq",
    "question": "A developer wants to use an Amazon S3 bucket to store application logs that contain sensitive data. Which AWS service or feature should the developer use to restrict read and write access to the S3 bucket?",
    "options": [
      "Security groups",
      "Amazon cloudatch",
      "ACL's",
      "AWS cloud trails"
    ],
    "answer": "ACL's",
    "hint": "Capability to apply restriction and secure read and write access to the S3 bucket using ACLs."
  },
  {
    "type": "mcq",
    "question": "A retail company is building a new mobile app. The company is evaluating whether to build the app and at an on-premise data center or in AWS cloud. Which of the following are benefits of building this app in the AWS cloud? You need to choose two options here.",
    "options": [
      "Complete control over the physical security of the infrastructure",
      "Flexibility to scale up in minutes as the application becomes popular",
      "Ability to pick the specific data centers that will host the application servers",
      "Increased speed for trying out new projects",
      "a large upfront capital expense and low variable expenses"
    ],
    "answer": "Flexibility to scale up in minutes as the application becomes popular, Increased speed for trying out new projects",
    "hint": "Trade fixed expense for variable expense, massive economies of scale, go global in minutes."
  },
  {
    "type": "mcq",
    "question": "A company uses Amazon Workspaces. According to the AWS shared responsibility model, which task is the responsibility of AWS?",
    "options": [
      "Provide security for workspaces user accounts through AWS identity and access management, IM",
      "Configure AWS cloud trail to log API calls and user activity",
      "Set up multiffactor authentication for each workspace user account",
      "Ensure the environmental safety and security of the AWS infrastructure that hosts workspaces"
    ],
    "answer": "Ensure the environmental safety and security of the AWS infrastructure that hosts workspaces",
    "hint": "Environmental safety and security of AWS is responsibility of AWS."
  },
  {
    "type": "mcq",
    "question": "A company wants to build a serverless application that executes code in response to events such as changes to Amazon S3 buckets or updates to Dynamo DB tables. They require a service that can automatically scale and handle the eventdriven execution. Which AWS service should they use?",
    "options": [
      "Amazon event bridge",
      "AWS step functions",
      "AWS Lambda",
      "Amazon SNS"
    ],
    "answer": "AWS Lambda",
    "hint": "Compute solution with short runtimes automatically scale."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the responsibility of client under the AWS shared responsibility model? You need to choose two options.",
    "options": [
      "Decommission physical storage devices",
      "Control physical access to data centers",
      "Patch management of an Amazon EC2 instance operating system",
      "Security group and ACL configuration",
      "Patch management of an Amazon RDS instance operating system"
    ],
    "answer": "Patch management of an Amazon EC2 instance operating system, Security group and ACL configuration",
    "hint": "Patch management on ec2 instance OS is client's responsibility."
  },
  {
    "type": "mcq",
    "question": "A company wants to migrate its onremise web application to AWS. The application consists of multiple components including a web server, application server and database server. The company wants to ensure high availability and scalability for the application. Which AWS services should they use?",
    "options": [
      "Amazon EC2, Amazon RDS, AWS cloud formation",
      "Amazon ECS, Amazon RDS, AWS cloud formation",
      "Amazon EC2, Amazon Aurora, AWS Lambda",
      "Amazon ECS, Amazon Aurora, AWS autoscaling"
    ],
    "answer": "Amazon ECS, Amazon Aurora, AWS autoscaling",
    "hint": "High throughput, automatically scales of hybrid and on-premise application."
  },
  {
    "type": "mcq",
    "question": "How should you grant an Amazon EC2 instance access to an Amazon S3 bucket in accordance with security best practices?",
    "options": [
      "Modify the S3 bucket policy so any service can upload to it at any time",
      "Have the EC2 instance assume a role to obtain the privileges to upload the file to S3 bucket",
      "Hardcode an IM user secret key and access key directly in the application and upload the file to S3 bucket",
      "Store the IM user secret and access key in a text file on the EC2 instance. Read the keys and then upload the file"
    ],
    "answer": "Have the EC2 instance assume a role to obtain the privileges to upload the file to S3 bucket",
    "hint": "EC2 instance should assume a role to provide security."
  },
  {
    "type": "mcq",
    "question": "A company wants to deploy a serverless application that requires longunning workflows and coordination between multiple microservices. They want to utilize and monitor the execution flow of their application. Which AWS service should they use?",
    "options": [
      "AWS step functions",
      "AWS batch",
      "AWS glue",
      "Amazon SWF"
    ],
    "answer": "AWS step functions",
    "hint": "Workflow and coordinate between multiple microservices with a few clicks."
  },
  {
    "type": "mcq",
    "question": "Which AWS service provides a quick and automated way to create and manage AWS accounts?",
    "options": [
      "AWS quicksite",
      "AWS organizations",
      "Amazon light sale",
      "Amazon connect"
    ],
    "answer": "AWS organizations",
    "hint": "Creates and manage across multiple account. Shared resources."
  },
  {
    "type": "mcq",
    "question": "A company wants to migrate their existing relational database to AWS. They require a fully managed database service that offers high performance, scalability, and automated backups. Which AWS service should they use?",
    "options": [
      "Amazon RDS",
      "Amazon Dynamob",
      "Amazon Elastic Cacher",
      "Amazon Red Shift"
    ],
    "answer": "Amazon RDS",
    "hint": "Fully managed database and analytics engines. Migration of existing database."
  },
  {
    "type": "mcq",
    "question": "Which scenarios should a user report to the AWS abuse team? You need to choose two options.",
    "options": [
      "SQL injection attack being made from an IP address that doesn't belong to AWS",
      "A DOS attack being made on an AWS resource",
      "Patch management of an Amazon EC2 instance operating system",
      "A company's resource are being used in a way that is inconsistent with the corporate policy",
      "AWS resources are being used to host objectionable or illegal content",
      "A company is receiving HTTPS requests on a web server that is serving HTTP traffic"
    ],
    "answer": "A DOS attack being made on an AWS resource, AWS resources are being used to host objectionable or illegal content",
    "hint": "Abuse team assists when aws resources are used for objections and a DOS attack."
  },
  {
    "type": "mcq",
    "question": "A business needs to ensure that users of the AWS management console adhere to password complexity requirements or guidelines. How can the business customize the password complexity?",
    "options": [
      "Use an AWS organization service control policy or SCP",
      "Use an AWS IM account password policy",
      "Use an AWS IM user policy",
      "Use an AWS security hub manage insight to customize password complexity for users of the AWS management console"
    ],
    "answer": "Use an AWS IM account password policy",
    "hint": "Credential report provides password last use, can apply restriction and define user account access."
  },
  {
    "type": "mcq",
    "question": "An organization wants to remove the necessity for pre-eployment estimation of infrastructure capacity. Additionally, the organization wants to spend money on cloud resources only when the resources are needed. Which AWS cloud feature best meets the organization's need?",
    "options": [
      "Reliability",
      "Global reach",
      "Pay as you go pricing",
      "Economies of scale"
    ],
    "answer": "Pay as you go pricing",
    "hint": "Dynamically scale up/down with no guessing."
  },
  {
    "type": "mcq",
    "question": "How does consolidated billing help reduce costs for a company that has multiple AWS accounts?",
    "options": [
      "It aggregates usage across accounts so that the company can reach volume discount thresholds sooner",
      "It gives AWS resellers the ability to bill their customers for usage",
      "It provides a simplified billing invoice that the company can process more quickly than a standard invoice",
      "It offers an additional 10% discount on purchases of all upfront reserved instances"
    ],
    "answer": "It aggregates usage across accounts so that the company can reach volume discount thresholds sooner",
    "hint": "Higher economies of scale results lower pay as you go prices."
  },
  {
    "type": "mcq",
    "question": "Which disaster recovery option is the least expensive?",
    "options": [
      "Backup and restore",
      "Multicight",
      "Warm standby",
      "Pilot light"
    ],
    "answer": "Backup and restore",
    "hint": "Less expensive option than Pilot light. Recovery takes more time."
  },
  {
    "type": "mcq",
    "question": "Which AWS support plan provides a full set of AWS trusted advisor checks?",
    "options": [
      "Basic and developer support",
      "Business and basic support",
      "Business and enterprise support",
      "Developer and enterprise support"
    ],
    "answer": "Business and enterprise support",
    "hint": "A designated TAM gives consultative architectural guidance only in certain support plans."
  },
  {
    "type": "mcq",
    "question": "A company has infrastructure in one AWS region and is expanding operations to a second AWS region. The company is using the same AWS cloud for template in the second region that the company uses in the original region. The company attempts to launch Amazon EC2 on demand instance in the second region and receives error messages. What could cause these error messages?",
    "options": [
      "The company cannot operate in a second region until it updates its AWS contracts",
      "The company has not configured AWS budgets to monitor the budget for the EC2 instances",
      "The requested EC2 instance types are not available in the second region",
      "A new EC2 key pair has not been created for the EC2 instances"
    ],
    "answer": "A new EC2 key pair has not been created for the EC2 instances",
    "hint": "EC2 keys provide connectivity and it is region specific."
  },
  {
    "type": "mcq",
    "question": "A company is planning to migrate its onremise infrastructure to AWS. They have a large number of virtual machines running different operating systems and applications. The company wants to simplify the migration process and minimize the impact on their existing systems. Which AWS service should they use?",
    "options": [
      "AWS application migration service",
      "AWS snowball",
      "AWS data sync",
      "AWS application discovery service"
    ],
    "answer": "AWS application migration service",
    "hint": "Lift and shift allows physical/virtual or cloud migration."
  },
  {
    "type": "mcq",
    "question": "How does AWS charge for AWS Lambda usage once the free tier has been exceeded? You need to choose two options.",
    "options": [
      "By the number of versions of a specified Lambda function",
      "By the time it takes for the Lambda function to execute",
      "By the programming language that is used for the Lambda function",
      "By the number of requests made for a given Lambda function",
      "By the total number of Lambda functions in an AWS account"
    ],
    "answer": "By the time it takes for the Lambda function to execute, By the number of requests made for a given Lambda function",
    "hint": "Event-driven, can trigger easily. Built by executing duration and request count."
  },
  {
    "type": "mcq",
    "question": "A user needs an automated security assessment report that will identify unintended network access to Amazon EC2 instances and vulnerabilities on those instances. Which AWS service will provide this assessment report?",
    "options": [
      "Amazon Inspector",
      "EC2 Security Groups",
      "AWS Config",
      "Amazon Macy"
    ],
    "answer": "Amazon Inspector",
    "hint": "Provides information required to detect vulnerabilities on instances."
  },
  {
    "type": "mcq",
    "question": "AWS cloud formation is designed to help the user with which of the following activities?",
    "options": [
      "Set up data links",
      "Model and provision resources",
      "Update application code",
      "Create reports for billing"
    ],
    "answer": "Model and provision resources",
    "hint": "Capability to model, provision, manage, treating infrastructure as code."
  },
  {
    "type": "mcq",
    "question": "Your organization needs to store large amounts of unstructured data in the cloud. Which AWS service is best suited for this purpose?",
    "options": [
      "Amazon S3",
      "Amazon Dynamob",
      "AWS Snowball",
      "AWS Storage Gateway"
    ],
    "answer": "Amazon S3",
    "hint": "Simple storage service for any type of data."
  },
  {
    "type": "mcq",
    "question": "Your organization wants to grant temporary limited access to AWS resources for external partners without creating AWS IM users. Which AWS service can help you achieve this? You need to select two options here.",
    "options": [
      "AWS SSO",
      "Amazon Cognito",
      "AWS Directory Service",
      "AWS IM roles",
      "AWS organizations"
    ],
    "answer": "Amazon Cognito, AWS IM roles",
    "hint": "Temporary security credentials without long term IM user account can be possible with cognito and IM roles."
  },
  {
    "type": "mcq",
    "question": "A company has a AWS managed IM policy that does not grant the necessary permissions for users to accomplish required tasks. How can this be resolved?",
    "options": [
      "Use a third-party web application firewall managed rule from the AWS marketplace",
      "Enable AWS Shield Advanced",
      "Use AWS key management service KMS to create a customer managed key",
      "Create a custom IM policy"
    ],
    "answer": "Create a custom IM policy",
    "hint": "Customized policy with granular level control."
  },
  {
    "type": "mcq",
    "question": "Which AWS service is designed to help users who want to use machine learning for natural language processing NLP but do not have experience in machine learning",
    "options": [
      "AWS recognization",
      "AWS deep learning AMIs",
      "Amazon comprehend",
      "Amazon Sage Maker"
    ],
    "answer": "Amazon comprehend",
    "hint": "Text into speech can be possible without experience in machine learning."
  },
  {
    "type": "mcq",
    "question": "A running Amazon EC2 instance will be interrupted if capacity becomes temporarily unavailable in which of the following pricing models?",
    "options": [
      "On demand instances",
      "Spot instances",
      "Standard reserved instances",
      "Convertible reserved instances"
    ],
    "answer": "Spot instances",
    "hint": "Bid for unused capacity. Interrupted only if demand increases."
  },
  {
    "type": "mcq",
    "question": "You are the security officer in your organization and want a list of any potential vulnerabilities in Amazon EC2 security groups. Which AWS service should you use?",
    "options": [
      "AWS Trusted Advisor",
      "Amazon Guard Duty",
      "AWS Cloud Trail",
      "AWS Artifact"
    ],
    "answer": "AWS Trusted Advisor",
    "hint": "Provision resources following best practices, enhances security."
  },
  {
    "type": "mcq",
    "question": "If a user has an AWS account with an enterprise level AWS support plan, who is the primary point of contact for billing or account inquiries?",
    "options": [
      "AWS concier support team",
      "AWS marketplace seller",
      "AWS partner network partner",
      "Solutions architect"
    ],
    "answer": "AWS concier support team",
    "hint": "Billing and account experts that specialize with enterprise plan."
  },
  {
    "type": "mcq",
    "question": "Which of the following are categories of recommendations provided by AWS trusted advisor? You need to choose three options here.",
    "options": [
      "Cost optimization",
      "High availability",
      "Fault tolerance",
      "Least privilege access",
      "Performance"
    ],
    "answer": "Cost optimization, Fault tolerance, Performance",
    "hint": "Provision resources, best practices. Categories: cost optimization, security, performance."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service would enable you to share reserved instances across multiple accounts that your company manages?",
    "options": [
      "AWS cloud formation",
      "AWS organizations",
      "Amazon Cloudatch",
      "AWS Direct Connect"
    ],
    "answer": "AWS organizations",
    "hint": "Set fine-grained permission, automate account creation across multiple accounts."
  },
  {
    "type": "mcq",
    "question": "Which service provides a highly available and elastic NFS file system for both cloud-based and onpremise servers?",
    "options": [
      "Amazon S3",
      "Amazon S3 Glacier",
      "Amazon Elastic File System",
      "Amazon Elastic Block Store"
    ],
    "answer": "Amazon Elastic File System",
    "hint": "Capability to mount on premise servers simultaneously."
  },
  {
    "type": "mcq",
    "question": "Your company is moving their data storage from onremise to cloud. You are tasked with evaluating different approaches for data warehousing. Which AWS service should you use that provides a managed data warehousing solution and supports columner storage up to a pabyte scale?",
    "options": [
      "Amazon Dynamob",
      "Amazon Red Shift",
      "AWS database migration service",
      "Amazon Aurora"
    ],
    "answer": "Amazon Red Shift",
    "hint": "Data warehousing solution that reduces operational burden."
  },
  {
    "type": "mcq",
    "question": "Which element of the AWS global infrastructure enables caching of assets in a global content delivery network to reduce latency for end users?",
    "options": [
      "Region",
      "Local zone",
      "Availability zone",
      "Edge location"
    ],
    "answer": "Edge location",
    "hint": "Global network speed speeds content delivery."
  },
  {
    "type": "mcq",
    "question": "How can a user safeguard against AWS service outages in the event of a widespread natural disaster?",
    "options": [
      "Store application artifacts using AWS artifact and replicate them across multiple AWS regions",
      "Deploy applications across multiple AWS regions",
      "Use a hybrid cloud computing deployment model within the geographic region",
      "deploy applications across multiple availability zones within an AWS region"
    ],
    "answer": "Deploy applications across multiple AWS regions",
    "hint": "Safeguard against service outages."
  },
  {
    "type": "mcq",
    "question": "Who is responsible for configuration management under the AWS shared responsibility model?",
    "options": [
      "It is solely the responsibility of AWS",
      "It is solely the responsibility of the customer",
      "It is shared between AWS and the customer",
      "It is not part of AWS shared responsibility model"
    ],
    "answer": "It is shared between AWS and the customer",
    "hint": "Patch management and OS are shared responsibility."
  },
  {
    "type": "mcq",
    "question": "Your are designing a global application that requires low latency search capabilities. How can you achieve this using Amazon Cloud Search?",
    "options": [
      "Deploy Amazon Cloud Search in a single region closest to the majority of users",
      "Deploy Amazon Cloud Search in multiple regions, and use Amazon Route 53 latency based routing",
      "Use Amazon CloudFront to cache search results from a single search domain",
      "Deploy Amazon Cloud Search with a cross region replication setup"
    ],
    "answer": "Deploy Amazon Cloud Search in multiple regions, and use Amazon Route 53 latency based routing",
    "hint": "Distribute search load to minimize latency."
  },
  {
    "type": "mcq",
    "question": "Which of the following are best practices when using AWS organizations? You need to choose two options.",
    "options": [
      "Do not use tags for billing",
      "Do not use AWS organizations to automate AWS account creation",
      "Create accounts per department",
      "Disable cloud trail on multiple accounts",
      "Restrict account privileges using service control policies"
    ],
    "answer": "Create accounts per department, Restrict account privileges using service control policies",
    "hint": "Central control with fine grain permissions and separate departments with cost management."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service enables conventional SQL queries against stored data sets directly from Amazon S3?",
    "options": [
      "AWS Glue",
      "AWS Code Commit",
      "Amazon Cloud Search",
      "Amazon Athena"
    ],
    "answer": "Amazon Athena",
    "hint": "Standard SQL query without setting up or manage data warehouse."
  },
  {
    "type": "mcq",
    "question": "Your application experiences sudden spikes in traffic at unpredictable intervals. You want to ensure that your application can handle these spikes automatically without manual intervention. Which feature of Amazon EC2 autoscaling can help achieve this?",
    "options": [
      "Scheduled scaling",
      "Predictive scaling",
      "Dynamic scaling",
      "Elastic scaling"
    ],
    "answer": "Dynamic scaling",
    "hint": "Autoscaling dynamically add/remove instances on predefined policy."
  },
  {
    "type": "mcq",
    "question": "Which of the following services can be utilized to automate infrastructure? You need to choose two options.",
    "options": [
      "Amazon CloudFront",
      "AWS Cloud Formation",
      "AWS Batch",
      "Amazon Quicksite",
      "AWS Ops Works"
    ],
    "answer": "AWS Cloud Formation, AWS Ops Works",
    "hint": "Capability to model provision and manage treating infra as code and Opsworks stacks use Chef cookbooks."
  },
  {
    "type": "mcq",
    "question": "Which of the following guideline constitutes a well architecture design philosophy for cloud application development?",
    "options": [
      "provision resources for peak capacity",
      "Keep static data closer to compute resources",
      "Use tightly coupled components",
      "Design for automated recovery from failure"
    ],
    "answer": "Design for automated recovery from failure",
    "hint": "Reliability pillar design principle."
  },
  {
    "type": "mcq",
    "question": "Your organization is undergoing a comprehensive security audit and you need to provide auditors with the evidence of the security controls implemented in your AWS environment. What type of documents can you access in AWS artifact to fulfill this requirement?",
    "options": [
      "Performance metrics of your Amazon EC2 instances",
      "Service level agreement details for Amazon S3",
      "Compliance reports and artifacts",
      "AWS identity and access management user passwords"
    ],
    "answer": "Compliance reports and artifacts",
    "hint": "Artifacts gives evidence of security control to auditors."
  },
  {
    "type": "mcq",
    "question": "Your application is hosted on Amazon EC2 instances with autoscaling configured. You want to ensure that when an instance fails, it is replaced quickly and the application's performance is maintained. Which setting should you configure to achieve this?",
    "options": [
      "set a low minimum instance count and a high maximum instance count",
      "set a low cooldown period and a high instance termination policy",
      "set a low desired capacity and a high instance launch configuration",
      "set a low health check grace period and a high desired capacity"
    ],
    "answer": "set a low health check grace period and a high desired capacity",
    "hint": "Desired capacity of autoscaling replacement instance quickly and low health check ensures health before serving traffic."
  },
  {
    "type": "mcq",
    "question": "How can AWS most effectively assist a startup in cutting down its computing costs?",
    "options": [
      "By automating the provisioning of individual developer environments",
      "By automating customer relationship management",
      "By providing ondemand resources for peak usage",
      "By implementing a fixed monthly computing budget"
    ],
    "answer": "By providing ondemand resources for peak usage",
    "hint": "Compute optimized instances, variable expense for fixed."
  },
  {
    "type": "mcq",
    "question": "A workload hosted on AWS will continue to operate indefinitely by using a steady number of Amazon EC2 instances which pricing strategy will decrease costs while assuring the availability of computational resources.",
    "options": [
      "Reserved instances",
      "Dedicated hosts",
      "Ondemand instances",
      "Spot instances"
    ],
    "answer": "Reserved instances",
    "hint": "Save significant discounts and provides capacity reservation in specific AZ."
  },
  {
    "type": "mcq",
    "question": "Which type of VPN connection is recommended for connecting large scale onremise networks to multiple Amazon VPCs across different regions?",
    "options": [
      "Remote VPN",
      "ClientVPN",
      "Software VPN",
      "Hardware VPN"
    ],
    "answer": "Hardware VPN",
    "hint": "High throughput connection can be established."
  },
  {
    "type": "mcq",
    "question": "What is the purpose of a compliance report in AWS artifact?",
    "options": [
      "To generate custom audit reports based on userdefined criteria",
      "To provide realtime security alerts for AWS resources",
      "To track changes made to AWS services and resources",
      "To document AWS compliance with industry standards"
    ],
    "answer": "To document AWS compliance with industry standards",
    "hint": "Gives comprehensive view of security posture using compliance reports."
  },
  {
    "type": "mcq",
    "question": "Which metric should you monitor closely to determine if Amazon EC2 autoscaling is effectively adjusting the number of instances in your autoscaling group?",
    "options": [
      "CPU utilization",
      "Disk space usage",
      "Network throughput",
      "DNS queries per second"
    ],
    "answer": "CPU utilization",
    "hint": "Trigger scaling based on CPU utilization patterned pattern."
  },
  {
    "type": "mcq",
    "question": "A company has performance and regulatory requirements that call for it to run its workload only in its onremise data center. Which AWS service or resource should the company use? You need to choose two options.",
    "options": [
      "Amazon Pinpoint",
      "Amazon WorkLink",
      "AWS Outposts",
      "AWS AppSync",
      "AWS Snowball Edge"
    ],
    "answer": "AWS Outposts, AWS Snowball Edge",
    "hint": " extends aws services and infrastructure to on premise and snowball can perform edge computing tasks on premise."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the best practice to consider while designing your server service architecture?",
    "options": [
      "Build a single application component that can handle all the application functionality",
      "Design tightly coupled components",
      "Avoid monolithic architecture by segmenting workloads",
      "Make large changes on fewer iterations to reduce chances of failure"
    ],
    "answer": "Avoid monolithic architecture by segmenting workloads",
    "hint": "Segment workloads will add loose coupling and more flexible."
  },
  {
    "type": "mcq",
    "question": "How does the scale of cloud computing help you to save costs?",
    "options": [
      "You can quickly deploy application to customers and provide them with low latency",
      "Accessing services on demand helps to prevent access or limited capacity",
      "You don't have to invest in technology resources before using them",
      "The aggregated cloud usage from a large number of customers results in lower pay as you go pricing"
    ],
    "answer": "The aggregated cloud usage from a large number of customers results in lower pay as you go pricing",
    "hint": "higher economies scale Translation translated to lower variable expense prices."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service can a business use to identify and reroute customers to other servers in the event of a web server outage?",
    "options": [
      "Amazon Route 53",
      "Amazon CloudFront",
      "Amazon Guard Duty",
      "AWS Trusted Advisor"
    ],
    "answer": "Amazon Route 53",
    "hint": "DNS failover based on health checks."
  },
  {
    "type": "mcq",
    "question": "A business wishes to improve its capacity for infrastructure recovery in the event of a natural catastrophe. This capability corresponds to which pillar of the AWS well architected framework.",
    "options": [
      "Security",
      "Reliability",
      "Performance, efficiency",
      "Cost optimization"
    ],
    "answer": "Reliability",
    "hint": "Design procedures with automated recovery procedural fail procedimentos test recovery."
  },
  {
    "type": "mcq",
    "question": "A business wishes to downsize its infrastructure in order to save money. At which of the following stages should the business downsize? You need to choose two options.",
    "options": [
      "Right size when AWS supports calls and explains that right sizing is required",
      "Right size before a migration occurs to the cloud",
      "Right size when seasonal workloads are at their peak",
      "Right size continuously after the cloud onboarding process",
      "Right size after purchasing all reserved instances"
    ],
    "answer": "Right size before a migration occurs to the cloud, Right size continuously after the cloud onboarding process",
    "hint": "Save significantly discount if you right size continuously and right size before migration occurs."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service or functionality gives advice to customers about frequently asked billing questions?",
    "options": [
      "Amazon Pinpoint",
      "AWS Marketplace",
      "Amazon Connect",
      "AWS Knowledge Center"
    ],
    "answer": "AWS Knowledge Center",
    "hint": "Comprehensive report of billing related information."
  },
  {
    "type": "mcq",
    "question": "How can AWS customers benefit from deploying their applications across several availability zones?",
    "options": [
      "The application will have higher availability because it can withstand a service disruption in one availability zone",
      "There is a lower risk of service failure if a natural disaster causes a service disruption in an given AWS region",
      "There will be decreased application latency that will improve the user experience",
      "There will be better coverage as availability zones are geographically distant and can serve a wider area"
    ],
    "answer": "The application will have higher availability because it can withstand a service disruption in one availability zone",
    "hint": "Higher throughput can be achieved in multiple availability zones."
  },
  {
    "type": "mcq",
    "question": "A customer with an AWS basic support subscription has discovered that their AWS resources are being used for unauthorized purposes. What is the preferred mechanism for the user to notify AWS of the activity?",
    "options": [
      "Contact the AWS technical account manager",
      "Contact the AWS abuse team",
      "Contact the AWS concierge support team",
      "Contact the AWS support team"
    ],
    "answer": "Contact the AWS abuse team",
    "hint": "Abuse team assist when aws resources are implicated multiple abuse types."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services lets connect devices easily and securely interact with cloud applications and other devices?",
    "options": [
      "AWS IoT core",
      "Amazon SNS",
      "AWS directory service",
      "Amazon Cognito"
    ],
    "answer": "AWS IoT core",
    "hint": "Connected devices securely interact with cloud application, scalability, reduced overhead overhead overhead."
  },
  {
    "type": "mcq",
    "question": "You have been tasked with deploying an Amazon EC2 instance which has already been configured. Which of the following AWS capabilities allows you to do so?",
    "options": [
      "Amazon Elastic Block Store",
      "Amazon Machine Image",
      "Amazon EC2 Systems Manager",
      "Amazon App Stream 2.0"
    ],
    "answer": "Amazon Machine Image",
    "hint": " AMI provides information required to launch pre-configured instance."
  },
  {
    "type": "mcq",
    "question": "Which relational database service is an iteration of MySQL and only available in AWS?",
    "options": [
      "Postgress",
      "Aurora",
      "Mariab",
      "Red Shift"
    ],
    "answer": "Aurora",
    "hint": "Managed service compatible with MySQL and PostgreSql."
  },
  {
    "type": "mcq",
    "question": "A company wants to migrate its application to the AWS cloud. The company plans to identify and prioritize any business transformation opportunities and evaluate its AWS cloud readiness. Which AWS service or tool should the company use to meet these requirements?",
    "options": [
      "AWS migration hub",
      "AWS managed services",
      "AWS cloud adoption framework",
      "AWS wellarchchitected framework"
    ],
    "answer": "AWS cloud adoption framework",
    "hint": "Align with business objectives objectives business perspective adoption phase envision perspective of cloud readiness readiness readiness."
  },
  {
    "type": "mcq",
    "question": "A company is launching a critical business application in an AWS region. How can the company increase resilience for this application?",
    "options": [
      "Deploy the application in multiple VPCs",
      "Deploy the application in multiple subnets",
      "Deploy the copy of application in another AWS account",
      "Deploy the application in multiple availability zones"
    ],
    "answer": "Deploy the application in multiple availability zones",
    "hint": "Resilient architecture across multiple azs for high throughput throughput throughput."
  },
  {
    "type": "mcq",
    "question": "A web developer wants to use machine learning to classify images that are uploaded to a website. Which AWS service or feature can be used to implement this requirement?",
    "options": [
      "Amazon transcribe",
      "Amazon Mechanical Turk",
      "Amazon Recognition",
      "Amazon Sage Maker Clarify"
    ],
    "answer": "Amazon Recognition",
    "hint": "Uses machine learning or deep learning or deep neural network or deep learning algorithm."
  },
  {
    "type": "mcq",
    "question": "A company needs a low code visual workflow service that developers can use to build distributed applications. Which AWS service is designed to meet this requirement?",
    "options": [
      "AWS Step Functions",
      "AWS Config",
      "AWS Cloudatch",
      "AWS Lambda"
    ],
    "answer": "AWS Step Functions",
    "hint": "Workflow and coordinate multi microservices visual workflows without manual intervention."
  },
  {
    "type": "mcq",
    "question": "Which of the following perspective of AWS cloud adoption framework focuses on identifying capability gaps and helping your organization align its readiness for cloud adoption?",
    "options": [
      "envision",
      "align",
      "launch",
      "scale"
    ],
    "answer": "align",
    "hint": "Capability gaps can align can align stakeholders align readiness."
  },
  {
    "type": "mcq",
    "question": "A company needs software solutions that are hosted on the AWS platform or that are integrated with the AWS platform. The company needs solutions from independent software vendors as well as management and security vendors. Which group or team can provide these solutions?",
    "options": [
      "AWS concier support",
      "AWS technical account managers",
      "AWS partner network consulting partners",
      "AWS partner network technology partners"
    ],
    "answer": "AWS partner network technology partners",
    "hint": "software listing in curated digital catalog from independent software vendors vendors technology partner partner partner."
  },
  {
    "type": "mcq",
    "question": "Which of the following is an example of a decoupled, scalable, and cloud-based application?",
    "options": [
      "an application load balancer, web server, and database server that support a monolithic application",
      "a legacy database server that is running on the maximum instance size supported by its license",
      "a web page that is hosted on Amazon S3 and uses AWS Lambda to update an Amazon Dynamo DB database",
      "a mail and log application that runs a single Amazon EC2 instance"
    ],
    "answer": "a web page that is hosted on Amazon S3 and uses AWS Lambda to update an Amazon Dynamo DB database",
    "hint": "Decoupled and scalable are key."
  },
  {
    "type": "mcq",
    "question": "Company wants to automate the retention, creation, and deletion of Amazon Elastic Block Store snapshots. Which AWS service or feature can the company use to meet this requirement?",
    "options": [
      "AWS systems manager",
      "AWS organizations",
      "Amazon data life cycle manager",
      "Amazon S3 life cycle policies"
    ],
    "answer": "Amazon data life cycle manager",
    "hint": "Snapshot life cycle automated procedures policy."
  },
  {
    "type": "mcq",
    "question": "Which action is consistent with the principle of least privilege in terms of AWS cloud architecture?",
    "options": [
      "assign permissions that are based on job titles",
      "Allow users the minimum access that is needed to do a task",
      "Provide only the permissions that are needed for users to do their jobs in the current month",
      "prevent managers from accessing important source code"
    ],
    "answer": "Allow users the minimum access that is needed to do a task",
    "hint": "Minimum required privileges granted."
  },
  {
    "type": "mcq",
    "question": "A company has an Amazon S3 bucket containing images of a scanned financial invoices. The company is building an artificial intelligencebased application on AWS. The company wants the application to identify and read total balance amounts on the invoices. Which AWS service can be used to implement this requirement?",
    "options": [
      "Amazon text track",
      "Amazon Lex",
      "Amazon recognition",
      "Amazon forecast"
    ],
    "answer": "Amazon text track",
    "hint": "Text can be extracted easily to reduce overhead overhead overhead with machine learning, OCR capability, numerical data numerical data, read numerically data read and extract numerically data numerical data data text data data, numerical data."
  },
  {
    "type": "mcq",
    "question": "Which of the following activities will be considered out of a scope for AWS support?",
    "options": [
      "Answering how to questions on AWS services and features",
      "Troubleshooting AWS APIs",
      "Solving problems detected by Amazon EC2 health checks",
      "Tuning database queries"
    ],
    "answer": "Tuning database queries",
    "hint": "Support guidance best practices, database optimization guide, tuning database queries queries queries, tuning database queries queries out of scope of scope scope scope scope scope scope."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or tool provides recommendations to help users get right-sized Amazon EC2 instances based on historical workload usage data.",
    "options": [
      "AWS AppRunner",
      "AWS Systems Manager",
      "AWS Compute Optimizer",
      "AWS Pricing Calculator"
    ],
    "answer": "AWS Compute Optimizer",
    "hint": "Analyze historical usage using machine learning to produce optimal performance optimizer optimizer optimization optimizer compute compute optimizer optimization optimized optimized optimized right sizing instance instance right sizing instance optimal right sizing optimized compute."
  },
  {
    "type": "mcq",
    "question": "A company wants to push VPC flow logs to an Amazon S3 bucket. Which of the following actions will be company's responsibility?",
    "options": [
      "Managing the encryption options on the S3 bucket",
      "Managing the data in transit",
      "Managing the operating system updates on the S3 bucket",
      "Managing the infrastructure that runs the S3 bucket"
    ],
    "answer": "Managing the encryption options on the S3 bucket",
    "hint": "Responsibility of the customer data encryption data data."
  },
  {
    "type": "mcq",
    "question": "Which perspective of the AWS cloud adoption framework encourages the development of well architected cloud focused application?",
    "options": [
      "Platform",
      "Operations",
      "Governance",
      "Security"
    ],
    "answer": "Platform",
    "hint": "Best practices for well architected systems optimized optimization maximized maximized optimization platform platform optimized."
  },
  {
    "type": "mcq",
    "question": "A company is looking for a managed machine learning service that can recommend products based on a customer's previous behaviors. Which AWS service can be used for this requirement?",
    "options": [
      "Amazon Pinpoint",
      "Amazon Sage Maker",
      "Amazon Personalize",
      "Amazon Comprehend"
    ],
    "answer": "Amazon Personalize",
    "hint": "Uses machine learning or deep neural network model customized customized customized parameterized."
  },
  {
    "type": "mcq",
    "question": "A company is planning to migrate to the AWS cloud. Company wants to identify measurable business outcomes that will explain the value of company's decision to migrate. Which phase of the cloud transformation journey includes these activities?",
    "options": [
      "Envision",
      "Align",
      "Launch",
      "Scale"
    ],
    "answer": "Envision",
    "hint": "Establish can establish Direction and shared vision vision."
  },
  {
    "type": "mcq",
    "question": "A company wants to use guidelines from the AWS wellarchchitected framework to limit human error and facilitate consistent responses to events. Which of the following is a well architected design principle that will meet these requirements?",
    "options": [
      "migrate workloads to a dedicated host",
      "use AWS code deploy",
      "perform operation as code",
      "use AWS compute optimizer"
    ],
    "answer": "perform operation as code",
    "hint": "Limits human error, reduces manual procedures error."
  },
  {
    "type": "mcq",
    "question": "A company is migrating to the AWS cloud and wants to optimize the use of its current software licenses. Which AWS services, features or purchasing options can the company use to meet these requirements? You need to choose two options here.",
    "options": [
      "Amazon EC2 dedicated hosts",
      "AWS budgets",
      "AWS compute optimizer",
      "AWS license manager",
      "Savings plan"
    ],
    "answer": "Amazon EC2 dedicated hosts, AWS license manager",
    "hint": "Bring Your Own License scenarios and manages software license in Curated curated central central curate curated catalog curate Curated curate curate Curated curate Curated."
  },
  {
    "type": "mcq",
    "question": "Which among the following are common stakeholders for the AWS cloud adoption framework platform perspective? You need to choose two options.",
    "options": [
      "IT architects",
      "Chief financial officers",
      "Chief data officers",
      "Chief information officers",
      "Engineers"
    ],
    "answer": "IT architects, Engineers",
    "hint": " IT Architects design architecture architecture engineers implement technical aspects technical technical platform aligned aligned business business align stakeholders stakeholders platform architecture optimized architecture."
  },
  {
    "type": "mcq",
    "question": "A company wants to provide one of its employees with access to Amazon RDS. The company also wants to limit the interaction to only the AWS CLI and AWS software development kits. Which combination of actions should the company take to meet these requirements while following the principles of least privilege? You need to choose two options.",
    "options": [
      "Create an IM user and provide programmatic access only",
      "Create an IM policy with administrator access and attach it to the IM user",
      "Create an IM user and provide AWS management console access only",
      "Create an IM policy with Amazon RDS access and attach it to the IM user",
      "create an IM role and provide AWS management console access only"
    ],
    "answer": "Create an IM user and provide programmatic access only, Create an IM policy with Amazon RDS access and attach it to the IM user",
    "hint": "Programmatic access only limit interaction through CLI and SDK."
  },
  {
    "type": "mcq",
    "question": "A company previously lost data that was stored in an on-premise data center. To prevent or protect against future loss of data, the company wants to use AWS to automatically launch thousands of its machines in a fully provisioned state in minutes in a format that supports data restoration. Which AWS service should the company use to meet these requirements?",
    "options": [
      "AWS backup",
      "AWS storage gateway",
      "Cloud endure disaster recovery",
      "AWS direct connect"
    ],
    "answer": "Cloud endure disaster recovery",
    "hint": "Disaster Recovery Continuously replicates machines in staging area staging area staging area machines replication replicated across multiple multiple multiple, replicates machines staging area machines state configuration configuration configurations system state configurations databases applications applications files configurations replicated continuously continuous continuous replication replication low cost staging area preferred preferred aws account region staging area low cost low cost machines replicated multiple Variant."
  },
  {
    "type": "mcq",
    "question": "Which of the following components must be attached to a VPC to enable inbound internet access?",
    "options": [
      "Internet gateway",
      "VPC endpoint",
      "NAT gateway",
      "VPN connection"
    ],
    "answer": "Internet gateway",
    "hint": "Connect VPC endpoints, direct traffic to internet."
  },
  {
    "type": "mcq",
    "question": "A cloud practitioner needs an Amazon EC2 instance to launch and run for 7 hours without interruptions. What is the most suitable and cost effective option to accomplish this task?",
    "options": [
      "Spot instance",
      "Reserved instance",
      "On demand instance",
      "Dedicated host"
    ],
    "answer": "On demand instance",
    "hint": "Less expensive option than Dedicated host. Recovery takes more time, 1 second built increments."
  },
  {
    "type": "mcq",
    "question": "Which AWS service is a cloud security posture management service that aggregates alerts from various AWS services and partner products in a standardized format and",
    "options": [
      "Amazon Guard Duty",
      "AWS Security Hub",
      "AWS Trusted Advisor",
      "Amazon Event Bridge"
    ],
    "answer": "AWS Security Hub",
    "hint": "Aggregates prioritized findings standardized format minimized application downtime downtime minimum minimal minimizing down time downtime minimized detection mitigate minimized detection."
  },
  {
    "type": "mcq",
    "question": "Companies using AWS identity and access management. Who among the following can manage the access keys of the AWS account root user?",
    "options": [
      "AWS account owner",
      "IM roles in any account that have been granted permission",
      "IM users in the same account that have been granted permission",
      "IM users and roles that have been granted permission"
    ],
    "answer": "AWS account owner",
    "hint": "IAM can use globally, delivered globally, delivered globally, not replicated outside. Root users credential for closing account settings registered registered registered seller seller."
  },
  {
    "type": "mcq",
    "question": "Which Amazon S3 feature or storage class uses the AWS backbone network and edge locations to reduce latencies from the end user to Amazon S3.",
    "options": [
      "S3 standard infrequent access",
      "S3 transfer acceleration",
      "S3 cross region replication",
      "S3 event notifications"
    ],
    "answer": "S3 transfer acceleration",
    "hint": "Content delivery network to serve dynamic content."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service could an administrator use to provide desktop environments for several employees?",
    "options": [
      "AWS organizations",
      "AWS workspaces",
      "AWS VAF",
      "AWS Fargate"
    ],
    "answer": "AWS workspaces",
    "hint": "Fully managed desktop computing service in cloud, simplified streamlined process simplified streamlining simplified process simplified streamlined simplified simplified streamlined optimized optimized simplified simplified maximized operational simplified operational optimized reduced overhead reduced reduced reduction minimized simplified simplified operational efficiency minimized cost minimized simplified streamlined."
  },
  {
    "type": "mcq",
    "question": "Which of the following statements are examples of a company's effort to rightsize its AWS resources to control cloud costs? You need to choose two options.",
    "options": [
      "Use multi-AZ deployments for Amazon RDS",
      "Switch from Amazon RDS to Amazon Dynamob to accommodate NoSQL data sets",
      "Use Amazon S3 life cycle policies to move objects that users access infrequently to lower cost storage tiers",
      "Replace existing Amazon EC2 instances with AWS elastic beantock",
      "Base the selection of Amazon EC2 instance types on past utilization patterns"
    ],
    "answer": "Use Amazon S3 life cycle policies to move objects that users access infrequently to lower cost storage tiers, Base the selection of Amazon EC2 instance types on past utilization patterns",
    "hint": "Pricing varied as per past usage patterns, analyzed analyze past uses past usage utilization to produce optimal compute cost optimized."
  },
  {
    "type": "mcq",
    "question": "Company wants to receive alerts when resources that are launched in the company's AWS account reach 80% of their service quotas. Which AWS service should the company use to meet this requirement?",
    "options": [
      "AWS trusted advisor",
      "AWS config",
      "AWS cloud trail",
      "Amazon inspector"
    ],
    "answer": "AWS trusted advisor",
    "hint": "Provision following best practices enhanced security."
  },
  {
    "type": "mcq",
    "question": "A company is using AWS for all its IT infrastructure. The company's developers are allowed to deploy applications on their own. The developers wants to deploy their applications without having to provision the infrastructure themselves. Which AWS service should the developers use to meet these requirements?",
    "options": [
      "AWS cloud formation",
      "AWS code build",
      "AWS code deploy",
      "AWS elastic beanto"
    ],
    "answer": "AWS elastic beanto",
    "hint": "Simplified Streamlined Streamlined streamline maximized maximized maximizing streamlined process streamlined streamlined streamline optimized optimized simplified streamlined."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS service or tool lists all the users in an account and reports on the status of account details including passwords, access keys and multiffactor authentication devices",
    "options": [
      "AWS shield",
      "Amazon inspector",
      "IM credential report",
      "AWS trusted advisor"
    ],
    "answer": "IM credential report",
    "hint": "Credentail report provides password last use, helps administrors administrors to monitor manage manage manage administrors monitoring manage manage manage administrors manage and monitor monitoring manages monitoring administrors, administrors monitor and manage administrors administrors security monitoring manage manage administrors administrors monitor and manage manages monitoring administrors managers monitoring managers managers managers monitoring managers monitor and manage manage manage managers monitoring manages managers manages monitor manages monitor and manage managers monitoring monitor manages manage managers monitoring managers monitor managers monitoring managers manage manage manage managers monitoring managers monitoring monitor and manage manage manage managers monitoring managers monitoring managers managers manage managers monitors monitor manage manage manages monitors manage managers manage manages monitors and manages security administrors, managers monitoring monitor and manage managers security administrors security monitoring managers and manages and manages and manages security managers administrors manage and monitor managers security monitoring monitors monitors monitor and manages. managers monitoring monitor manage manages monitors monitor manage manage manage managers monitoring managers manages manage managers manage monitor and manages and manage administrors manage managers monitor and manage administrors manage monitor and manage administrors and manages. managers manage manages manages monitoring monitor manage managers security monitoring monitors and manages monitors. monitor and manages security managers manages monitor manage managers monitor manage manage manages monitors monitor managers manage and monitor managers security managers monitor manages manage manages monitoring monitor manages manage. managers manages monitor and manage monitors. manages monitors monitor and manages manages manages monitor manages managers manage monitor manages manage managers monitor and managing manages monitors monitor manage manages monitoring monitor and managing managers security monitors and manages administrors managers monitor manage managers manage monitor and manages security manages monitoring manages. managers monitor and manage monitors and manage managers manage and monitor managing manages security monitoring managers manage manage and monitor managers manage monitors monitors manages. managers monitoring monitor manages manage manage managers monitoring monitors manages. managers manages managers manage manage managers manage monitors monitors. handles managed source control versions Private git git repository version."
  },
  {
    "type": "mcq",
    "question": "A company has stopped all of its Amazon EC2 instances but monthly billing charges continue to occur. Which of the following could be the potential cause of this? You need to choose two options.",
    "options": [
      "Input output charges",
      "Elastic IP charges",
      "Operating system charges",
      "Amazon elastic block store storage charges",
      "Hardware charges"
    ],
    "answer": "Elastic IP charges, Amazon elastic block store storage charges",
    "hint": "Elastic IPs subject charges, EBS volumes are billed separately, subject to charges, separately."
  },
  {
    "type": "mcq",
    "question": "A company needs to perform data processing once a week that typically takes about 5 hours to complete. Which AWS service should the company use for this workload?",
    "options": [
      "AWS code deploy",
      "AWS wavelength",
      "Amazon EC2",
      "AWS Lambda"
    ],
    "answer": "Amazon EC2",
    "hint": "Event-driven triggered facilmente, short runtime."
  },
  {
    "type": "mcq",
    "question": "A company provides Amazon workspaces to its remote employees. The company wants to prevent employees from using their virtual desktops to visit a specific websites that are known to be malicious. Which AWS service should the company use to meet this requirement?",
    "options": [
      "Amazon network firewall",
      "Amazon Route 53",
      "AWS Shield Advanced",
      "Amazon Guard Duty"
    ],
    "answer": "Amazon network firewall",
    "hint": "Allows simplified streamlined process, optimized reduction of operational overhead minimized overhead overhead."
  },
  {
    "type": "mcq",
    "question": "A user has a stateful workload that will run on Amazon EC2 for the next 3 years. What is the most cost effective pricing model for this workload?",
    "options": [
      "Spot instances",
      "Dedicated instances",
      "On demand instances",
      "Reserved instances"
    ],
    "answer": "Reserved instances",
    "hint": "Save significantly discount if you right size continuously."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services stores graph data in the form of vortices and edges?",
    "options": [
      "Amazon Dynamob",
      "Amazon Neptune",
      "Amazon RDS",
      "Amazon Quantum Ledger Database"
    ],
    "answer": "Amazon Neptune",
    "hint": "Graph database, capability to built applications quickly simplified streamlined."
  },
  {
    "type": "mcq",
    "question": "Which of the following AWS services or resources can a company use directly on its onremise servers? You need to choose two options.",
    "options": [
      "AWS cloud formation",
      "Amazon Cognito",
      "Application load balancer",
      "AWS ops works",
      "AWS storage gateway"
    ],
    "answer": "AWS ops works, AWS storage gateway",
    "hint": "Automate procedures using Chef cookbook and hybrid storage services, seamless data usage."
  },
  {
    "type": "mcq",
    "question": "A large company has a workload that requires hardware to remain on premises. The company wants to use the same management and control plane services that it currently uses on AWS. Which AWS service should the company use to meet these requirements?",
    "options": [
      "AWS Fargate",
      "AWS outposts",
      "AWS ground station",
      "AWS device form"
    ],
    "answer": "AWS outposts",
    "hint": "Extend aws infrastructure services to almost any on premise location. consistent hybrid experience experience consistent consistent consistent hybrid experience consistent consistency hybrid experience consistent consisten hybrid hybrid consistent hybrid consistency consistency consistency consistent consistent consist consistency consistent consistency consistent consistency consistent consistency consistency consistent consistent consistency consist consistency consistent consisten consistency consistens consistency consistency consistent consisten consistency consistens consisten consistency."
  },
  {
    "type": "mcq",
    "question": "A company wants to limit its employees AWS access to a portfolio of predefined AWS resources. Which AWS solution should the company use to meet this requirement?",
    "options": [
      "AWS config",
      "AWS apps sync",
      "AWS software deployment kit",
      "AWS service catalog"
    ],
    "answer": "AWS service catalog",
    "hint": "Create organizer govern curated catalog catalog Shared shared shared curation govern catalog governance gov Shared shared curation governs curation shared curated Curated curated."
  },
  {
    "type": "mcq",
    "question": "A company needs to establish a connection between two VPCs. The VPCs are located in two different AWS regions. The company wants to use the existing infrastructure of the VPCs for this connection. Which AWS service or feature can be used to establish this connection?",
    "options": [
      "AWS clientVPN",
      "VPC endpoints",
      "VPC peering",
      "AWS direct connect"
    ],
    "answer": "VPC peering",
    "hint": "Private IP address peering and can peer across region, redundant Dedicated Fiber Fiber low latency connections redundant physical physically redundant Dedicated fiber physically separated physical físicamente redundant redundant Dedicated Fiber Fiber low high throughput connection Fiber high redundant físicamente redundant high redundant redundant físicamente separated physically separated ffs físicamente separated high bandwidth connection físicamente separated ffs físicamente fff redund high bandwidth redundant físicamente separated redundant."
  },
  {
    "type": "mcq",
    "question": "Which AWS service or feature identifies whether an Amazon S3 bucket or an IM role has been shared with an external entity?",
    "options": [
      "AWS service catalog",
      "AWS organizations",
      "AWS systems manager",
      "AWS IM access analyzer"
    ],
    "answer": "AWS IM access analyzer",
    "hint": "Automated reasoning analyzer analyzer analyzing analyze policies policies analyzed analyzing analyze analyzes Analyze policies analyze analyzed analyze analyzing analyze Analyzing analyzes analyze analyzed analyzing analyzed analyzes Analyze Analyzing."
  },
  {
    "type": "mcq",
    "question": "A company does not want to rely on elaborate forecasting to determine its usage of compute resources. Instead, the company wants to pay only for the resources that it uses. The company also needs the ability to increase or decrease its resource usage to meet business requirements. Which pillar of the AWS wellarchchitected framework aligns with these requirements?",
    "options": [
      "Security",
      "Cost optimization",
      "Reliability",
      "Operational excellence"
    ],
    "answer": "Cost optimization",
    "hint": " aggregated usage aggressive usage usage optimized. higher scale cloud cloud aggregating usage aggregating usage high economies scale cost cost low lower lower cost lower optimized lower lower cost lower variable optimized variable optimized."
  },
  {
    "type": "mcq",
    "question": "A company has designed its AWS cloud infrastructure to run its workloads effectively. The company also has protocols in place to continuously improve supporting processes. Which pillar of the AWS well architected framework does the scenario represent?",
    "options": [
      "Security",
      "Cost optimization",
      "Reliability",
      "Operational excellence"
    ],
    "answer": "Operational excellence",
    "hint": "Refine PROCED procedimentos PROCED frequently, frequent refined proced refine proced proced Proced procedimentos PROCED refined frequently procedural proced procedimentos procedural refined frequent. anticipate failures anticipate failure frequently anticip ant ant anticipate failure ant refine ant ant procedural frequently."
  },
  {
    "type": "mcq",
    "question": "A company has a physical tape library to store data backups. The tape library is running out of space. The company needs to extend the tape libraries capacity to the AWS cloud. Which AWS service should the company use to meet this requirement?",
    "options": [
      "AWS storage gateway",
      "Amazon Elastic Block Store",
      "Amazon Elastic File System",
      "Amazon S3"
    ],
    "answer": "AWS storage gateway",
    "hint": "Seamless usage standard file standard file standard standard file standard seamless usage uses hybrid usage usage usage Standard seamlessly usage usage seamlessly uses seamless usage Standard seamless seamlessly Standard seamless Standard Standard."
  },
  {
    "type": "mcq",
    "question": "A retail company needs to build a highly available architecture for a new e-commerce platform. The company is using only AWS services that replicate data across multiple availability zones. Which AWS service should the company use to meet this requirement? You need to choose two options here.",
    "options": [
      "Amazon Aurora",
      "Amazon EC2",
      "Amazon Dynamo DV",
      "Amazon EVS",
      "Amazon Red Shift"
    ],
    "answer": "Amazon Aurora, Amazon Dynamo DV",
    "hint": "Replicates multiple availability zones in AWS region high throughput low network latency encrypted bandwidth fully redundant fiber separated ffs high low network latency low network low encrypted separated redundant fiber separated."
  },
  {
    "type": "mcq",
    "question": "A company has a critical application that runs at a remote site that has a slow internet connection. The company wants to migrate the workload to AWS. The application is sensitive to latency and interruptions in connectivity. The company wants a solution that can host this application with minimum latency. Which AWS service or feature should the company use to meet these requirements?",
    "options": [
      "AWS local zones",
      "AWS outposts",
      "AWS wavelength",
      "Availability zones"
    ],
    "answer": "AWS outposts",
    "hint": " Extend aws infrastructure and services services consistent consistency consistency consistent consistency. extending extended extend extending consistent consistency extending consistent Extending consist consistent consistent hybrid consistent consist consistency consistency consistent consistency consist hybrid consistent consistency context consistency extended architecture consist extend consist Extend consist Extending context."
  },
  {
    "type": "mcq",
    "question": "A company wants to use the AWS cloud to provide secure access to desktop applications that are running in a fully managed environment. Which AWS service should the company use to meet these requirements?",
    "options": [
      "AWS AppSync",
      "AWS Outposts",
      "Amazon S3",
      "Amazon AppStream 2.0"
    ],
    "answer": "Amazon AppStream 2.0",
    "hint": "Provision manage reduced reductions reductions minimize minimized streamlined minimized cost simplified minimized simplified reduced simplified simplified simplified. Reduction reduced operational simplified prioritized prioritize reduction prioritized prioritized prioritization reduced prioritized reduction maximized operationalized operational maximized Operational minimized minimized operational maximized optimized minimized operational operational maximized."
  },
  {
    "type": "mcq",
    "question": "A company is designing its AWS workload so that components can be updated regularly and so that changes can be made in a small reversible increments. Which pillar of the AWS well architected framework does this design support?",
    "options": [
      "Security",
      "Reliability",
      "Performance, efficiency",
      "Operational excellence"
    ],
    "answer": "Operational excellence",
    "hint": "Design procedures refined frequently frequent frequently ant frequently ant ant refine ant ant proced frequent refine refined frequent ant ant refine frequent PROCED refinement refined frequent ant ant refined frequent refinement procedural procedural refinement procedural frequent. make small frequent change anticipate failure Frequently proced frequent make ant PROCED Proced frequent refine frequently refinement refined frequent procedural refine PROCED refine frequent procedural Frequently procedural Frequently Proced frequent anticipate refined PROCED ant ant proced frequent and reversal Proced Proced frequent reversal Proced refine refined Proced refine proced Proced refined PROCED ant anticipate refined proced Proced ant ant procedural ant ant proced ant refine anticipate failure Proced refinement PROCED refine PROCED Proced reversal and reversal."
  },
  {
    "type": "mcq",
    "question": "A company simulates workflows to review and validate that all processes are effective and that staff are familiar with the processes. Which design principle of the AWS well architected framework is the company following with this practice?",
    "options": [
      "Refine operation procedures frequently",
      "Perform operation as good",
      "Structure the company to support business outcomes",
      "Make frequent small reversible changes"
    ],
    "answer": "Refine operation procedures frequently",
    "hint": " ant refined proced procedural frequently Frequently frequent ant ant proced and frequent Proced Proced refinement refined frequent frequent procedural refine procedural refined frequent procedural refined refinement refined frequent ant refine refined frequent refinement refined Frequently procedural refine PROCED refinement."
  },
  {
    "type": "mcq",
    "question": "A company manages global applications that require stat static IP addresses. Which AWS service would enable the company to improve the availability and performance of its applications?",
    "options": [
      "Amazon API gateway",
      "AWS Global Accelerator",
      "Amazon S3 Transfer Acceleration",
      "Amazon CloudFront"
    ],
    "answer": "AWS Global Accelerator",
    "hint": " global static public IPs Fixed entry entry entry entry entry entry fixed fixed fixed Fixed Entry entry point entry point entry."
  },
  {
    "type": "mcq",
    "question": "A user has been granted permissions to change their own IM user password. Which AWS services can the user use to change the password? You need to choose two options here.",
    "options": [
      "AWS command line interface",
      "AWS key management service",
      "AWS secrets manager",
      "AWS management console",
      "AWS resource access manager"
    ],
    "answer": "AWS command line interface, AWS management console",
    "hint": "Credentials report provides password last use last last used and can apply restrictions on who can change branch proteção proteção Proteção Proteção branch proteção proteção Proteção branch proteção branch proteção Proteção proteção Proteção proteção branch branch branch branch proteção branch proteção branch branch Proteção proteção Proteção Proteção Proteção proteção branch branch proteção Proteção Proteção Proteção branch Proteção branch proteção proteção proteção branch proteção Proteção branch proteção Proteção proteção branch proteção Proteção branch branch Proteção Proteção Proteção Proteção branch Proteção Proteção branch branch Proteção Proteção Proteção branch Proteção branch branch Proteção branch Proteção branch branch branch Proteção branch branch branch branch branch branch Proteção branch Proteção Proteção Proteção Proteção branch branch branch branch branch branch branch branch Proteção Proteção branch Proteção branch branch Proteção branch branch branch Proteção branch branch Proteção Proteção branch Proteção branch Proteção Proteção Proteção protection, can grant programmatic credentials Credentials programmatic credentials Credentials programmatic programmatic credentials, program Programmatic program programmatic credentials Credentials program Programmatic Programmatic programmatic program programmatic credentials programmatic programmatic Programmatic programmatic credentials Credentials."
  },
  {
    "type": "mcq",
    "question": "A company needs to generate reports for business intelligence and operational analytics on pabytes of semistructured and structured data. These reports are produced from a standard SQL queries on data that is in an Amazon S3 data lake. Which AWS service provides the ability to analyze this data?",
    "options": [
      "Amazon Neptune",
      "Amazon Dynamob",
      "Amazon Red Shift",
      "Amazon RDS"
    ],
    "answer": "Amazon Red Shift",
    "hint": " Managed Data warehousing minimized simplified simplified reductions simplified reduction minimize maximized Operational minimized Operational optimized simplified Streamlined streamline streamlined minimized streamlined simplified reduced optimized simplified reduced Reduction minimized reduced stylized reduced standardized simplified streamlined optimized reduce minimized operational stylized stylized simplified minimized simplified reduction minimization prioritized minimization styled reductions standardized standardized minimized stylized stylized reductions minimization standardized."
  },
  {
    "type": "mcq",
    "question": "A company needs to deploy a postra SQL database into Amazon RDS. The database must be highly available and fall tolerant. Which AWS solution should the company use to meet these requirements?",
    "options": [
      "Amazon RDS with a single availability zone",
      "Amazon RDS snapshots",
      "Amazon RDS with a multiple availability zone",
      "AWS database migration service"
    ],
    "answer": "Amazon RDS with a multiple availability zone",
    "hint": "High Availability Multi-AZ deployment configurations consistent with multi AZ deployment to handle load distribution and failover failover failover Multi-AZ configuration to distribute incoming requests across redundant multi AZ configuration consistent Multi-AZ Multi-AZ deployment redundant separated AZs redundantly Multi-AZ configuration redundant Multi-AZ redundant configuration and failover failover multi AZ multi Multi-AZ distribution multiple availability multiple availability separation separation, redundancy separation separation Multi-AZ deployment distribution separations separation multi redundancy Multi-AZ multi AZ Multi-AZ red Multi-AZ redundancy Multi-AZ distribution across redundant separated AZs physically physically redundant fully redundant network separa separated fysically separated фізично separate redund físicas separate fis physical redundancy physics redundancy physically separate fys physical separate multi redundancy physical redundant physiques separation separation physical."
  },
  {
    "type": "mcq",
    "question": "Which of the following tasks is the responsibility of the customer according to the AWS shared responsibility model?",
    "options": [
      "Patch Amazon RDS software",
      "Maintain the security of the AWS global infrastructure",
      "Maintain the security of the hardware that runs Amazon EC2 instances",
      "patch the guest operating system of Amazon EC2 instances"
    ],
    "answer": "patch the guest operating system of Amazon EC2 instances",
    "hint": "Security in cloud, guest OS patching."
  },
  {
    "type": "mcq",
    "question": "An e-commerce company has migrated its infrastructure from an on-premise data center to the AWS cloud. Which cost is the company's direct responsibility?",
    "options": [
      "Cost of the power for the AWS servers",
      "Cost of the application software licenses",
      "Cost of the hardware infrastructure on AWS",
      "Cost of physical security for the AWS data center"
    ],
    "answer": "Cost of the application software licenses",
    "hint": " licenses and optimized license curated central CURATED catalogCURATED Curated catalog share curate govern centralized governing simplified streamlined reduced reduced operational simplified reduced operational centralized curate go Curated curate govern curate CURATED Curated curate governCurated curated govern governs curate governs Curated Curated curated curated curated curated governs govern Curated Curated governCurated govern governs curated govern. reduced operacional minimized minimized stylized stylized reductions stylized prioritized standardized reductions standardization standardization."
  },
  {
    "type": "mcq",
    "question": "Which of the following are shared controls that apply to both AWS and the customer according to the AWS shared responsibility model? You need to choose two options.",
    "options": [
      "Network data integrity",
      "Resource configuration management",
      "Physical and environmental security",
      "Replacement and disposal of disk drives",
      "Employee awareness and training"
    ],
    "answer": "Resource configuration management, Employee awareness and training",
    "hint": " Configuration management and patching responsibility."
  },
  {
    "type": "mcq",
    "question": "Which is the least expensive AWS support plan that contains a full set of AWS trusted advisor best practice checks.",
    "options": [
      "AWS basic support",
      "AWS developer support",
      "AWS business support",
      "AWS enterprise support"
    ],
    "answer": "AWS business support",
    "hint": "Support plans comparison simplified reduced operational minimal minimal minimal reduction standardized standardized simplified reduced minimal reduction prioritized reduction maximized operational standardized streamlined prioritized reduction minimized minimized standardized minimal minimized standard prioritized standardized minimization standard minimized standardized stylized standardized standardized reductions minimize maximized operational simplified streamlined streamlined minimized minimized simplified prioritized maximize operationalized optimized streamlined stylized minimized maximized minimized centralized curated simplified streamlined optimized streamlined minimized maximized centralized governing."
  },
  {
    "type": "mcq",
    "question": "A global company is building a simple time tracking mobile app. The app needs to operate globally and must store collected data in a database. Data must be accessible from the AWS region that is closest to the user. What should the company do to meet these data storage requirements with the least amount of operational overhead?",
    "options": [
      "Use Amazon EC2 in multiple regions to host separate databases",
      "Use Amazon RDS cross region replication",
      "Use AWS database migration service",
      "Use Amazon Dynamob global tables"
    ],
    "answer": "Use Amazon Dynamob global tables",
    "hint": " Mobile high performance NoSQL fully managed replicated, low network throughput low throughput encryptedSeparated separated fys physical separ separate физи физи separated físicas separate fys separates físicas ffs físico separated físico фізи physical."
  },
  {
    "type": "mcq",
    "question": "How does the AWS cloud help companies build agility into their processes and cloud infrastructure?",
    "options": [
      "Companies can access a range of technologies to experiment and innovate quickly",
      "Companies can avoid provisioning too much capacity when they do not know how much capacity is required",
      "Companies can expand into new geographic regions",
      "Companies can pay for IT resources only when they use the resources"
    ],
    "answer": "Companies can access a range of technologies to experiment and innovate quickly",
    "hint": " access a range of technologies experimentation innovation quickly reduced reduction stylized reductions stylized prioritized stylized reduction minimize stylized stylizedized stylized prioritization styled styled standardization standardized standardizedization standardized stylized sanitized normalized standardized sanitation standardized Sanitized prioritized."
  },
  {
    "type": "mcq",
    "question": "A company has a serverless application that includes an Amazon API gateway, an AWS Lambda function, and an Amazon DynamoB database. Which AWS service can the company use to track user requests as they move through the applications components?",
    "options": [
      "AWS X-Ray",
      "AWS Cloud Trail",
      "Amazon Cloudatch",
      "Amazon Inspector"
    ],
    "answer": "AWS X-Ray",
    "hint": "Analyze debug distribute distribution Analyzer analyze analyze analyze analyzer analyze Analyzes Analyzing analysis analysis Analyzer analyzing analyses analyzing Analyze analysis analysis analyseAnalyzer analyses analyze analysis Analyzes analyse analizar analizar Analyzer Analyzing."
  },
  {
    "type": "mcq",
    "question": "Which AWS service offers gateway VPC endpoints that can be used to avoid sending traffic over the internet? You need to choose two correct options here.",
    "options": [
      "Amazon S3",
      "AWS code build",
      "Amazon simple Q service",
      "Amazon Dynamo DB",
      "Amazon simple notification service"
    ],
    "answer": "Amazon S3, Amazon Dynamo DB",
    "hint": " VPC Endpoint services services private connection."
  },
  {
    "type": "mcq",
    "question": "Which of the following is the customer responsible for updating and patching according to the AWS shared responsibility model?",
    "options": [
      "AWS directory service for Microsoft Active Directory",
      "Amazon RDS for Microsoft SQL Server",
      "Amazon Workspaces Virtual Windows Desktop",
      "Amazon FSX for Windows File Server"
    ],
    "answer": "Amazon Workspaces Virtual Windows Desktop",
    "hint": " Security 'in' the cloud. patch management guest OS."
  },
  {
    "type": "mcq",
    "question": "A company implements an Amazon EC2 autoscaling policy along with an application load balancer to automatically recover unhealthy applications that run on Amazon EC2 instances. Which pillar of the AWS well architected framework does this action cover?",
    "options": [
      "Reliability",
      "Security",
      "Performance, efficiency",
      "Operational excellence"
    ],
    "answer": "Reliability",
    "hint": "Design procedures with automated recovery procedural failures PROCED procedimentos PROCED refinement frequently frequent Frequently refine Frequently refina PROCED PROCED ref frequent Proced refinement refine frequently frequently ref proceduresProcedProced refinementProcedProcedrefine PROCED ref PROCED."
  },
  {
    "type": "mcq",
    "question": "A company launched an Amazon EC2 instance with the latest Amazon Linux to AMI. Which actions can a system administrator take to connect to the EC2 instance? You need to choose two options here.",
    "options": [
      "use Amazon connect",
      "use AWS batch",
      "use Amazon EC2 instance connect",
      "use AWS systems manager session manager",
      "use a remote desktop protocol connection"
    ],
    "answer": "use Amazon EC2 instance connect, use AWS systems manager session manager",
    "hint": " program program programmatic credentials programmable program Programmable programmable Credentials, can grant programmatic."
  }
];

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentIndex = 0;
let score = 0;
let answered = false; // prevents double-submitting

/* ══════════════════════════════════════════
   DOM REFERENCES
══════════════════════════════════════════ */
const screens = {
  welcome:  document.getElementById('screen-welcome'),
  question: document.getElementById('screen-question'),
  result:   document.getElementById('screen-result'),
};

const el = {
  qCounter:        document.getElementById('q-counter'),
  progressFill:    document.getElementById('progress-fill'),
  qTypeTag:        document.getElementById('q-type-tag'),
  qText:           document.getElementById('q-text'),
  optionsContainer:document.getElementById('options-container'),
  shortContainer:  document.getElementById('short-answer-container'),
  shortInput:      document.getElementById('short-input'),
  shortHint:       document.getElementById('short-hint'),
  answerFeedback:  document.getElementById('answer-feedback'),
  feedbackIcon:    document.getElementById('feedback-icon'),
  feedbackText:    document.getElementById('feedback-text'),
  btnNext:         document.getElementById('btn-next'),

  // result
  ringProgress:    document.getElementById('ring-progress'),
  resultScorePct:  document.getElementById('result-score-pct'),
  resultFraction:  document.getElementById('result-fraction'),
  levelBadge:      document.getElementById('level-badge'),
  levelText:       document.getElementById('level-text'),
  resultMessage:   document.getElementById('result-message'),
  resultBreakdown: document.getElementById('result-breakdown'),
};

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function showScreen(name) {
  Object.keys(screens).forEach(k => {
    screens[k].classList.toggle('hidden', k !== name);
  });
  // Re-trigger animation
  screens[name].style.animation = 'none';
  void screens[name].offsetHeight; // reflow
  screens[name].style.animation = '';
}

function normalise(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/* ══════════════════════════════════════════
   RENDER QUESTION
══════════════════════════════════════════ */
function renderQuestion(index) {
  answered = false;
  const q = questions[index];

  // Progress
  el.qCounter.textContent = `Question ${index + 1} / ${questions.length}`;
  const pct = (index / questions.length) * 100;
  el.progressFill.style.width = pct + '%';

  // Type tag
  el.qTypeTag.textContent = q.type === 'mcq' ? 'Multiple Choice' : 'Short Answer';
  el.qTypeTag.className = 'question-type-tag ' + q.type;

  // Question text
  el.qText.textContent = q.question;

  // Reset feedback
  el.answerFeedback.classList.add('hidden');
  el.feedbackIcon.textContent = '';
  el.feedbackText.textContent = '';
  el.feedbackText.className = 'feedback-text';

  // Reset Next button
  el.btnNext.disabled = true;

  // Show correct input method
  if (q.type === 'mcq') {
    el.optionsContainer.style.display = 'flex';
    el.shortContainer.classList.add('hidden');
    renderMCQ(q);
  } else {
    el.optionsContainer.style.display = 'none';
    el.shortContainer.classList.remove('hidden');
    el.shortInput.value = '';
    el.shortInput.className = 'short-input';
    el.shortInput.disabled = false;
    el.shortInput.focus();
    el.shortHint.textContent = '';
    renderShort(q);
  }
}

/* MCQ renderer */
function renderMCQ(q) {
  el.optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-label">${opt}</span>
    `;
    btn.addEventListener('click', () => handleMCQSelect(btn, opt, q));
    el.optionsContainer.appendChild(btn);
  });
}

/* Short answer renderer */
function renderShort(q) {
  // Submit on Enter
  el.shortInput.onkeydown = (e) => {
    if (e.key === 'Enter' && !answered) submitShort(q);
  };

  // Enable Next once user types something
  el.shortInput.oninput = () => {
    if (!answered) {
      el.btnNext.disabled = el.shortInput.value.trim() === '';
    }
  };

  // Override Next button click for short-answer to first validate
  el.btnNext.onclick = () => {
    if (!answered && el.shortInput.value.trim() !== '') {
      submitShort(q);
    } else if (answered) {
      advance();
    }
  };
}

/* ══════════════════════════════════════════
   ANSWER HANDLING
══════════════════════════════════════════ */
function handleMCQSelect(btn, chosen, q) {
  if (answered) return;
  answered = true;

  const allBtns = el.optionsContainer.querySelectorAll('.option-btn');
  const isCorrect = chosen === q.answer;

  allBtns.forEach(b => {
    b.disabled = true;
    const label = b.querySelector('.option-label').textContent;
    if (label === q.answer) b.classList.add('correct');
    if (b === btn && !isCorrect) b.classList.add('wrong');
  });

  if (isCorrect) {
    score++;
    showFeedback(true);
  } else {
    showFeedback(false, `Correct answer: ${q.answer}`);
  }

  // Switch Next button to advance
  el.btnNext.onclick = advance;
  el.btnNext.disabled = false;
}

function submitShort(q) {
  if (answered) return;
  answered = true;

  const userAnswer = el.shortInput.value.trim();
  const isCorrect = normalise(userAnswer) === normalise(q.answer);

  el.shortInput.disabled = true;
  el.shortInput.classList.add(isCorrect ? 'correct-state' : 'wrong-state');

  if (isCorrect) {
    score++;
    el.shortHint.textContent = '✓ ' + q.hint;
    el.shortHint.style.color = 'var(--green)';
    showFeedback(true);
  } else {
    el.shortHint.textContent = `Correct answer: "${q.answer}" — ${q.hint}`;
    el.shortHint.style.color = 'var(--red)';
    showFeedback(false);
  }

  // Next button now advances
  el.btnNext.onclick = advance;
  el.btnNext.disabled = false;
}

function showFeedback(correct, extra = '') {
  el.answerFeedback.classList.remove('hidden');
  el.feedbackIcon.textContent = correct ? '✓' : '✗';
  el.feedbackText.textContent = correct ? 'Correct!' : (extra || 'Incorrect');
  el.feedbackText.className = 'feedback-text ' + (correct ? 'correct' : 'wrong');
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
function advance() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion(currentIndex);
  } else {
    showResult();
  }
}

/* ══════════════════════════════════════════
   RESULT SCREEN
══════════════════════════════════════════ */
function showResult() {
  showScreen('result');

  const total = questions.length;
  const pct   = Math.round((score / total) * 100);

  // Score text
  el.resultScorePct.textContent = pct + '%';
  el.resultFraction.textContent = `${score} / ${total} correct`;

  // Ring animation
  const circumference = 2 * Math.PI * 52; // ≈ 327
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    el.ringProgress.style.strokeDashoffset = offset;
  }, 200);

  // Colour ring based on performance
  if (pct >= 70) el.ringProgress.style.stroke = 'var(--green)';
  else if (pct >= 40) el.ringProgress.style.stroke = 'var(--amber)';
  else el.ringProgress.style.stroke = '#60a5fa';

  // Level
  let level, levelClass, message;
  if (pct < 40) {
    level = 'Beginner';
    levelClass = 'beginner';
    message = "You're just starting your tech journey! Review the basics of operating systems, CPUs, and storage — you'll level up quickly.";
  } else if (pct < 70) {
    level = 'Intermediate';
    levelClass = 'intermediate';
    message = "Solid foundation! You understand the core concepts. A little more study on the finer details and you'll be Advanced in no time.";
  } else {
    level = 'Advanced';
    levelClass = 'advanced';
    message = "Impressive! You have a strong grasp of ICT fundamentals. You clearly know your tech — share the quiz with someone who wants to learn!";
  }

  el.levelText.textContent = level;
  el.levelBadge.className = 'level-badge ' + levelClass;
  el.resultMessage.textContent = message;

  // Breakdown
  const wrong = total - score;
  el.resultBreakdown.innerHTML = `
    <div class="breakdown-item">
      <div class="breakdown-label">Correct</div>
      <div class="breakdown-value green">${score}</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Incorrect</div>
      <div class="breakdown-value red">${wrong}</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Accuracy</div>
      <div class="breakdown-value">${pct}%</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Questions</div>
      <div class="breakdown-value">${total}</div>
    </div>
  `;
}

/* ══════════════════════════════════════════
   RESET / RESTART
══════════════════════════════════════════ */
function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  el.ringProgress.style.strokeDashoffset = 327;
  showScreen('welcome');
}

/* ══════════════════════════════════════════
   EVENT LISTENERS (static buttons)
══════════════════════════════════════════ */
document.getElementById('btn-start').addEventListener('click', () => {
  showScreen('question');
  renderQuestion(0);
  // Default Next handler (overridden per-question type inside render)
  el.btnNext.onclick = advance;
});

document.getElementById('btn-restart').addEventListener('click', resetQuiz);

// Initial Next button default
el.btnNext.onclick = advance;
