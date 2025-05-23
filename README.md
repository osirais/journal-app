# journal-app

## Web Application

To run the web version of **journal-app** (built with Next.js):

1. Navigate to the `web` directory and install dependencies:

   ```sh
   cd web
   bun i
   ```

2. Create a `.env.local` file in the `web` directory with the following content:

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

   Populate the values with your Supabase project credentials.

3. Start the development server:

   ```sh
   bun d
   ```

---

## Mobile Application

To run the mobile version of **journal-app** (built with Expo):

1. Navigate to the `app` directory and install dependencies:

   ```sh
   cd app
   bun i
   ```

2. Create a `.env` file in the `app` directory with the following content:

   ```
   EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_URL=
   EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_ANON_KEY=
   ```

   Fill in your Supabase credentials accordingly.

3. Start the Expo development server:

   ```sh
   bun start
   ```

4. Scan the QR code displayed in the terminal using the Expo Go app on your mobile device to launch the app.
