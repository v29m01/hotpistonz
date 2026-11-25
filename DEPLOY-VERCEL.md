# Put the Hot Pistonz site live on Vercel

You need three free accounts: GitHub (stores the code), MongoDB Atlas (database), and Vercel (hosting).
The project is already set up for Vercel: `vercel.json`, `api/index.js` and Vercel Blob uploads are included.

> **Plan note:** Vercel's free Hobby plan is for personal, non-commercial use only. A business website
> counts as commercial, so the client's live site should be on the paid **Pro** plan. You can test on Hobby first.

---

## Part 1 — Put the code on GitHub

1. Go to https://github.com/signup and create an account (skip if you have one).
2. Click **+** (top right) → **New repository**. Name it `hotpistonz`, choose **Private**, click **Create repository**.
3. Unzip `hotpistonz-mern.zip`. Open a terminal **inside the `hotpistonz` folder** and run
   (replace `YOUR-USERNAME`):

   ```bash
   git init
   git add .
   git commit -m "Hot Pistonz website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/hotpistonz.git
   git push -u origin main
   ```

   If Git asks you to log in, sign in with your GitHub account in the browser window that opens.
   Check: refresh the GitHub page — you should see `client`, `server`, `api`, `vercel.json` and so on.
   The `.env` file is **not** uploaded (that's correct — passwords never go on GitHub).

## Part 2 — Create the database (MongoDB Atlas)

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (Google sign-in is fine).
2. Create a cluster: choose **Free** (M0), any provider, a region near the UAE (e.g. Bahrain or Mumbai), click **Create**.
3. **Database user:** when asked, create a username and password. Use letters and numbers only in the
   password (symbols like `@` or `#` break the connection string). Save them.
4. **Network access:** go to **Security → Network Access → Add IP Address → Allow access from anywhere**
   (`0.0.0.0/0`) → **Confirm**. Vercel's servers change IP addresses, so this is required.
5. **Connection string:** go to **Database → Connect → Drivers**. Copy the string. It looks like:

   ```
   mongodb+srv://hpadmin:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

   Replace `<db_password>` with your password, and add the database name `hotpistonz` after `.net/`:

   ```
   mongodb+srv://hpadmin:MyPass123@cluster0.abcde.mongodb.net/hotpistonz?retryWrites=true&w=majority&appName=Cluster0
   ```

   Keep this — it's your `MONGO_URI`.

## Part 3 — Create the Vercel account and import the project

1. Go to https://vercel.com/signup → choose **Hobby** (to test) → **Continue with GitHub** and allow access.
2. On the dashboard click **Add New… → Project**.
3. Find `hotpistonz` in the list and click **Import**. (Not listed? Click **Adjust GitHub App Permissions** and give Vercel access to the repo.)
4. On the **Configure Project** screen:
   - **Framework Preset:** Other (Vercel reads the settings from `vercel.json` — don't change build settings).
   - **Root Directory:** leave as `./`
   - Open **Environment Variables** and add:

     | Name | Value |
     |---|---|
     | `MONGO_URI` | your connection string from Part 2 |
     | `ADMIN_KEY` | a long password for the Staff Dashboard (e.g. `HotPistonz-Workshop-2026!`) |

5. Click **Deploy**. Wait 1–2 minutes. You'll get a link like `https://hotpistonz.vercel.app`.

## Part 4 — Turn on photo & video uploads (Vercel Blob)

The dashboard's Images tab saves files to Vercel Blob (Vercel can't keep files on its own servers).

1. In your Vercel project, open the **Storage** tab → **Create Database** → **Blob** → **Continue**.
2. Name it `hotpistonz-media`, choose **Public** access, click **Create**, and connect it to the `hotpistonz` project
   (all environments). This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. Go to **Deployments**, click **⋯** on the newest one → **Redeploy**. (New settings only apply after a redeploy.)

## Part 5 — Check everything works

| Test | How |
|---|---|
| Site loads | Open your `.vercel.app` link, click through a few pages and refresh one (e.g. `/about-us`) |
| API + database | Open `https://YOUR-SITE.vercel.app/api/health` → should show `{"ok":true}` |
| Booking form | Submit a test booking on **Book a Service** |
| Dashboard | Footer → **Staff Dashboard** → log in with your `ADMIN_KEY` → the test booking is listed |
| Uploads | Dashboard → **Images** → upload a photo → reload the site, it stays |

## Part 6 — Connect hotpistonz.com

1. In the Vercel project: **Settings → Domains** → type `hotpistonz.com` → **Add**. Also add `www.hotpistonz.com`.
2. Vercel shows DNS records (an **A** record for `hotpistonz.com` and a **CNAME** for `www`).
   Log in where the domain was bought (GoDaddy, Namecheap, etc.) → DNS settings → add those records,
   replacing the old ones that point to the current WordPress host.
3. Wait (minutes to a few hours). Vercel adds HTTPS automatically when the domain shows **Valid Configuration**.

> Switching DNS takes the old site offline. Do this only after the client approves the new site.
> Email (Info@hotpistonz.com) uses **MX** records — don't delete those.

## Updating the site later

Change the code, then:

```bash
git add .
git commit -m "Describe the change"
git push
```

Vercel rebuilds and publishes automatically within a minute or two.

## If something goes wrong

| Problem | Fix |
|---|---|
| Build failed | Project → **Deployments** → click the failed one → read the red lines in **Build Logs** |
| Bookings say "Service temporarily unavailable" | `MONGO_URI` wrong, password has symbols, or Network Access isn't `0.0.0.0/0`. Fix, then **Redeploy** |
| Dashboard says "Invalid admin key" | Use the exact `ADMIN_KEY` from Vercel's Environment Variables |
| Upload fails | Blob store not connected, or you didn't redeploy after connecting it |
| A page shows 404 after refresh | Make sure `vercel.json` is in the repo's top folder |
