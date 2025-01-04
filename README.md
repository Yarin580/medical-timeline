# Medical History Timeline

## Features

- Interactive timeline visualization
- Animated card reveal on scroll
- Responsive layout
- Patient information display
- Medical record aggregation
- CPT code linking

## **Tech Stack**

- **Frontend**: React 18 with TypeScript
- **Component Library**: Material-UI 5.x.x, TailwindCSS 3.x.x
- **Bundler**: Vite

---

## Project Structure

```
public/
├── dataforuitask.csv # csv file for mocking medical record
src/
├── assets/            # Static assets
├── components/
│   ├── core/          # Core components
│   ├── layout/        # Layout components
│   └── TimeLine/      # Timeline components
├── context/           # Context providers
├── hooks/             # Custom hooks
├── pages/             # Pages
├── tests/             # Unit Tests
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

## Files Explanation

### `src` Directory

The `src` directory contains the core codebase:

- **`components/`**:

  - **`core/`**

    - `ScrollButton.tsx`: Button component for scrolling the timeline.

  - **`layout/`**

    - `TimeLineLayout.tsx`: The main layout for displaying the timeline.

  - **`TimeLine/`**: Folder containing all components related to the timeline feature.
    - **`TimeLineCard/`**
      - `CardHeader.tsx`: Handles the header of timeline cards.
      - `CodesSection.tsx`: Displays relevant medical codes in the card.
      - `DiagnosticsSection.tsx`: Displays diagnostic information in the card.
      - `TagsSection.tsx`: Shows tags related to the medical record code.
      - `TimeLineCard.tsx`: The main card component for a timeline entry.
    - `LineDot.tsx`: Visualizes dots on the timeline line.
    - `TimeLineCardWrapper.tsx`: Wraps individual cards for additional styling or logic.
    - `TimeLineLine.tsx`: Draws the visual timeline.

- **`context/`**

  - `TimelineDirectionContext.tsx`: Context provider for managing timeline orientation.

- **`hooks/`**

  - `useMedicalHistory.tsx`: A custom hook for fetching and managing medical history data.
  - `useScroll.tsx`: A custom hook for handling scroll functionality.
  - `useTimelineAnimation.tsx`: A custom hook for handling timeline animations.

- **`pages/`**

  - `PatientMedicalHistoryPage.tsx`: The main page for viewing a patient's medical history.

- **`tests/`**

  - `aggregatePatientMedicalHistory.test.ts`: Unit tests for medical history aggregation utilities.
  - `getProducerByCode.test.ts`: Unit tests for retrieving medical producers by code.

- **`types/`**

  - `MedicalRecord.ts`: Type definitions for medical record data.
  - `Patient.ts`: Type definitions for patient information includes useful functions.

- **`utils/`**
  - `medicalHistoryAggregation.ts`: Utility functions for aggregating medical history data.
  - `procedures.ts`: Utility functions for handling medical procedures.

### Root Files

- `App.tsx`: The main entry point of the React app.
- `App.css`, `index.css`: Stylesheets for global and app-specific styling.
- `main.tsx`: Bootstraps the React app with the main component.

### `public` Directory

Contains the CSV file that mocks the API data `dataforuitask.csv`.

## Running the App

To start the development server, run:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Testing

Run unit tests with:

```bash
npm test
```
