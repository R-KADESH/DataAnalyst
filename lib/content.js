// Starter content. The site uses this until Supabase is connected (and as a
// backup if the database can't be reached). After that, edit everything from /admin.

export const profile = {
  full_name: "TAPOPHILE DJOUAKA Nathanael Caleb",
  headline: "Aspiring Data Analyst — turning raw data into clear decisions",
  availability: ["Data analyst internships", "Scholarships"],
  bio: "I build dashboards and analyses that make data easy to act on. I'm learning in public: every project, course and fix is logged below, so you can see how my skills grow week by week.",
  journey: [
    { date: "2026", title: "Started my data analytics journey", description: "Excel, SQL and Power BI fundamentals through hands-on projects." },
    { date: "2026", title: "First dashboards", description: "From a first Power BI report to a 50,000-row Excel dashboard." },
    { date: "Next", title: "Internship & scholarship", description: "Bringing this dedication to a real data team — and to further studies." },
  ],
  resume_url: null,
  email: null,
  linkedin: null,
  github: null,
};

export const projects = [
  {
    slug: "bmw-sales",
    title: "BMW Sales 2010–2024",
    summary: "Interactive Excel dashboard over 50,000 sales records: 11 models, 6 regions, 15 years.",
    problem: "How do sales volumes differ by model, region, fuel type and year — and can a manager explore that in seconds without touching formulas?",
    data_description: "50,000 sales records (2010–2024) with model, year, region, colour, fuel type, transmission, engine size, mileage, price and sales volume. The distribution is almost perfectly even across categories, which suggests a synthetic dataset — so the project focuses on dashboard building, not real BMW strategy.",
    approach: "Cleaned the data in a working sheet, summarised it with pivot tables, then built a one-page dashboard with KPI cards and slicers (sales class, fuel type, region, year) that drive every chart at once.",
    findings: "Asia is the top region (≈43.0M units) and the 7 Series the best-selling model (≈23.8M units), but every region and model sits within about ±3% of the others. Yearly sales stay between 16.3M and 17.9M, peaking in 2022.",
    impact: "A stakeholder can answer \"how did X sell in Y?\" with two clicks instead of writing formulas.",
    improvements: "Use estimated revenue (price × volume) instead of summing prices, start bar-chart axes at zero, and rebuild the dashboard in Power BI to compare both tools.",
    tools: ["Excel", "Pivot Tables", "Data Visualization"],
    dataset_rows: 50000,
    cover_image_url: "/projects/bmw-sales.png",
    github_url: null,
    notebook_url: null,
    live_url: null,
    featured: true,
    updated_at: "2026-10-11",
  },
  {
    slug: "data-jobs-survey",
    title: "Data Jobs Survey",
    summary: "Power BI report on 630 data professionals: salaries, favourite languages and job satisfaction.",
    problem: "What do data professionals earn, which tools do they prefer, and how happy are they with their jobs?",
    data_description: "A survey of 630 data professionals worldwide: job title, salary range, favourite programming language, country, age and satisfaction scores (0–10).",
    approach: "Transformed the survey in Power Query (splitting salary ranges, averaging them, cleaning job titles), then designed a single-page report with a treemap, bar charts, a donut and gauges in a consistent navy/green palette.",
    findings: "Python is the clear favourite (≈2 in 3 respondents). Data Scientists report the highest average salary (≈$77k), Data Analysts ≈$41k. Satisfaction is moderate: 5.7/10 for work-life balance and only 4.3/10 for salary.",
    impact: "Shows at a glance which roles pay most and which skills are most in demand — useful for anyone (like me) planning a data career.",
    improvements: "Rename raw survey field titles, label salaries in $k, add a country slicer and publish a live version to Power BI Service.",
    tools: ["Power BI", "Power Query", "Data Visualization"],
    dataset_rows: 630,
    cover_image_url: "/projects/data-jobs-survey.png",
    github_url: null,
    notebook_url: null,
    live_url: null,
    featured: true,
    updated_at: "2026-10-11",
  },
];

// Dates are taken from the project files — correct them in /admin if needed.
export const learningLog = [
  { entry_date: "2026-10-11", title: "Portfolio review & redesign", description: "Audited all my projects, found metric errors in my own dashboards and wrote an upgrade plan for each.", tags: ["Review"] },
  { entry_date: "2026-10-11", title: "Bike sales dashboard", description: "Excel dashboard on ~1,000 customers: income, age brackets and commute distance vs. bike purchases.", tags: ["Excel"] },
  { entry_date: "2026-10-11", title: "Redesigned the Data Jobs Survey report", description: "New consistent navy/green palette and cleaner layout.", tags: ["Power BI", "Design"] },
  { entry_date: "2026-09-30", title: "Data Jobs Survey — first version", description: "Treemap, gauges and Power Query transformations on 630 survey answers.", tags: ["Power BI", "Power Query"] },
  { entry_date: "2026-09-22", title: "Star schema data model", description: "Built a sales model with one fact table and five dimension tables.", tags: ["Power BI", "Data Modeling"] },
  { entry_date: "2026-09-21", title: "My first Power BI report", description: "Tables and a monthly sales chart on a practice store dataset.", tags: ["Power BI"] },
  { entry_date: "2026-08-21", title: "BMW sales dashboard", description: "50,000 records, pivot tables, KPI cards and slicers in Excel.", tags: ["Excel"] },
  { entry_date: "2026-05-06", title: "Practice databases in MySQL", description: "Set up two databases (company HR & sales, theological research) to practise SQL from beginner to advanced.", tags: ["SQL", "MySQL"] },
];

export const skills = [
  { name: "Excel", category: "Analysis" },
  { name: "Pivot Tables", category: "Analysis" },
  { name: "Power BI", category: "Visualization" },
  { name: "Power Query", category: "Data Preparation" },
  { name: "Data Visualization", category: "Visualization" },
  { name: "SQL", category: "Databases" },
  { name: "Data Modeling", category: "Databases" },
];

export const certifications = [];
