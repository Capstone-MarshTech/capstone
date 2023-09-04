# Capstone

# Blue [i] Claims Dashboard

## Description

Claims insight is an enhanced analytics platform designed to help clients get a diagnostic review of their current claims management programs and provide operational efficiencies. It leverages advanced bench marking capabilities enabling clients to identify realistic cost saving opportunities and measure progress on realizing the opportunities.

## Design/Layout

![Architecture of frontend and backend](/Client/src/assets/Excalidraw.png)

## 📦 Tech stack:

### MERN

Frontend:

- React.js / Vite
- Recharts
- Material-UI: Data Grid
- State Management: Redux
- Axios

Backend:

- Node.js
- Express.js
- pandas
- python-dotenv
- pymongo
- ydata_profiling

Database:

- MongoDB

## 💾 Installation:

### /Server

- cd into the Server directory and run:

```
npm install
```

Create a `.env` file at the top level of the Server folder. This will hold the MongoDB connection string and server port number. Example:

```
MONGO_URI = "mongodb+srv://<your connection string here>/<your DB name here>"
PORT=<your server port number here>
```

Create a `data` folder at the top level of the Server folder, and place the original csv file in here. Rename it `demo_original.csv`.

Create a `mongodb_uploads` folder at the top level of the Server folder. Change directory into the `scripts` directory and run the files in this order:

```
python clean_csv.py
check_data_quality.py
feed_mongo.py
```

To get the server up and connect to the DB, cd into the Server directory and run:

```
npm run dev
```

### /Client

- cd into the Client directory and run:

```
npm install
```

Create a `.env.local` file at the top level of the Client folder. This will hold the `VITE_BASE_URL`. Example:

```
VITE_BASE_URL=http://localhost:<your port number here>
```

To ge the React app up and running, from the Client folder run:

```
npm run dev
```

After running the above command, use the local URL provided in your browser to see the React app.

## Screenshots

![Graph Screenshot](/Client/src/assets/graphScreenShot.png)

![Table Screenshot](/Client/src/assets/tableScreenShot.png)

## Project Link

[Blue [i] GitHub Wiki](https://github.com/Capstone-MarshTech/capstone/wiki/Blue%5Bi%5D-Documentation)

## Team Members

- ✨ https://github.com/FarjanaAkter1
- ✨ https://github.com/xani-dev
- ✨ https://github.com/MichaelAnthonyReidJr
- ✨ https://github.com/ethan-lee-dev1
- ✨ https://github.com/tartope
