#  StockMate

StockMate is a simple, modern inventory management web app built with **Next.js**, **TypeScript**, and **Supabase**.  
It helps small businesses and individuals keep track of stock levels, sales, and purchases with an intuitive dashboard and real-time updates.

---

## Features

- **Inventory Management** – Add, edit, and remove products easily.  
- **Sales & Purchases Tracking** – Record transactions and view summaries.  
- **Analytics Dashboard** – Visualize product trends and stock status.  
- **Authentication** – Secure user sign up and sign in with Supabase Auth.  
-  **Real-time Sync** – Inventory data updates across sessions instantly.  
-  **Responsive UI** – Built with Tailwind CSS for smooth layouts on all devices.  

---

##  Tech Stack

| Category | Tools Used |
|-----------|------------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **State Management** | Redux Toolkit + RTK Query |
| **UI Components** | ShadCN/UI (optional) |

---


##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/daysuwaa/stockmate.git
cd stockmate
```
### 2. Install Dependencies
``` bash
npm install
# or
yarn install

```

### 3. Create Environment Variables
``` bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_supabase_db_connection_string

```
### 4. Set up the Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Devlopement Server
``` bash
npm run dev

```
### Contributing

Pull requests are welcome.
If you’d like to add new features, please open an issue first to discuss what you’d like to change.

### License

This project is licensed under the MIT License — see the LICENSE file for details.

### Author

Adesuwa
Software Developer

