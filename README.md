# Motorway UI Test

A React application featuring a car image gallery and a user form.

## Getting Started

1. Clone the repo and run `npm ci`.
2. Run `npm run dev:all` so both the server and vite app run concurrently.

## Running the Tests

Run `npm run test`.

## Screenshots
<img width="1312" height="807" alt="Screenshot 2026-07-22 at 16 55 14" src="https://github.com/user-attachments/assets/bf306dfc-f4c1-4042-8df8-74a4c1905f25" />

<img width="1315" height="820" alt="Screenshot 2026-07-22 at 16 56 04" src="https://github.com/user-attachments/assets/3bd262df-e23a-406a-89fc-7ca689c9aa69" />

<img width="1308" height="811" alt="Screenshot 2026-07-22 at 16 56 37" src="https://github.com/user-attachments/assets/f8ea339e-ab03-4cfb-a871-d4112d5808a6" />

<img width="1315" height="809" alt="Screenshot 2026-07-22 at 16 57 04" src="https://github.com/user-attachments/assets/76134177-793c-450a-9f7f-ee1a4394d2df" />

## Key Decisions

#### 1. Data Fetching
Use TanStack Query to manage the image fetching logic. It provides automatic caching, background refetching, and simplified loading and error states. It ensures the application remains highly performant and does not over-fetch data from the Motorway API.

#### 2. Form Validation
Use React Hook Form for form state and validation. By relying on uncontrolled components, it prevents the entire form from re-rendering every time a user types. It also makes setting up custom validation rules a lot cleaner.

#### 3. Native Dialogs

The image modal utilises the <dialog> element. It provides native focus trapping, keyboard navigation (such as the Escape key to close), and proper screen reader support without relying on heavy third-party modal libraries.

#### 4. Styling
- Use Emotion (CSS-in-JS) to keep styles scoped and co-located with their components, which makes the codebase much easier to manage.
- Use Clsx to construct class names conditionally, specifically for toggling the active states between the Gallery and Form tabs.

#### 5. Testing
- Set up MSW (Mock Service Worker) for API requests during testing. This lets the tests mimic a real browser environment and ensures the `ImageGallery` renders predictably with strictly typed mock data.
- A global test-utils configuration automatically wraps tested components in the required Context Providers (like `QueryClientProvider`), keeping the actual test files clean and DRY.
 
#### 6. Structure and Workflow
[Image Gallery]
- Group all the gallery-related code into a `src/ImageGallery/` folder.
- Extract the data fetching into a custom `useImages` hook.
- The main `ImageGallery` component coordinates the data and renders the grid, showing a `GallerySkeleton` while the network request is pending.
- Create an `ImageButton` component for the individual grid items. This wraps a dedicated `Image` component that leverages the semantic <picture> tag to serve WebP formats with a JPG fallback, alongside native lazy loading (loading="lazy") to keep the initial render fast.
- Build an `ImageDialog` component to handle the full-size image view and the previous/next navigation logic.

[User Form]
- Add a `UserForm` component in `src/UserForm/`.
- Add generic `StringField` and `RangeField` components under `src/components/form/` and a `styles.ts` file for shared styles.
- Implement custom validation with React Hook Form, validate on form submission and display error messages.

[Navigation]
- Implement a simple tab interface at the top level to let users switch between the Image Gallery and the User Form.


## Future Improvements
- Server-Side Performance Optimisation: I kept the scope of this task strictly to the frontend, leaving the provided Express server untouched. To resolve the intentional network delay on the API, I would implement a simple cache variable/`Map()` on the server to store the JSON response and skip the timeout for the subsequent requests. Also, add a `Cache-Control` header on the response so the browser knows to cache the data locally. 

- Testing: The current tests verify the critical user flows, including form validation, image rendering, and modal navigation. The next step is to expand coverage to edge cases. This includes testing the tab navigation logic, the `GallerySkeleton` loading states, and simulating API failure (like 500 errors) via MSW.

- Modal UX: The user experience of the image dialog can be improved by moving the "Previous" and "Next" navigation buttons to the left and right sides of the full-size image. This provides a more standard gallery feel.

