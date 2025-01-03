# Medical History Timeline

## Features

- Interactive timeline visualization
- Animated card reveal on scroll
- Responsive layout
- Patient information display
- Medical record aggregation
- CPT code linking

## Projecs Structure

```
public/
├── dataforuitask.csv # csv file for mocking medical record
src/
├── components/
│   ├── layout/          # Layout components
│   └── TimeLine/        # Timeline components
├── hooks/               # Custom hooks
├── types/              # TypeScript definitions
├── pages/              # Pages
├── tests/              # Unit Tests
└── utils/              # Utility functions
```

## Files Expain

### `src` Directory

The `src` directory contains the core codebase:

- **components**: Modular, reusable React components used across the app.
  - **layout**
    - `TimeLineLayout.tsx`: The main layout for displaying the timeline.
  - **TimeLine**: Folder containing all components related to the timeline feature.
    - **TimeLineCard**
      - `CardHeader.tsx`: Handles the header of timeline cards.
      - `CodesSection.tsx`: Displays relevant medical codes in the card.
      - `DiagnosticsSection.tsx`: Displays diagnostic information in the card.
      - `TagsSection.tsx`: Shows tags related to the medical record code.
      - `TimeLineCard.tsx`: The main card component for a timeline entry.
      - `TimeLineCardWrapper.tsx`: Wraps individual cards for additional styling or logic.
    - `LineDot.tsx`: Visualizes dots on the timeline line.
    - `TimeLineContainer.tsx`: Contains and organizes the entire timeline.
    - `TimeLineLine.tsx`: Draws the visual timeline.
- **hooks**
  - `useMedicalHistory.tsx`: A custom hook for fetching and managing medical history data.
- **pages**
  - `PatientMedicalHistoryPage.tsx`: The main page for viewing a patient's medical history.
- **tests**
  - `aggrgatePatientMedicalHistory.test.ts`: Unit tests for medical history aggregation utilities.
  - `getProducerByCode.test.ts`: Unit tests for retrieving medical producers by code.
- **types**
  - `MedicalRecord.ts`: Type definitions for medical record data.
  - `Patient.ts`: Type definitions for patient information includes usefull functions.
- **utils**
  - `medicalHistoryAggregation.ts`: Utility functions for aggregating medical history data.
  - `procedures.ts`: Utility functions for handling medical procedures.

### Root Files

- `App.tsx`: The main entry point of the React app.
- `App.css`, `index.css`: Stylesheets for global and app-specific styling.
- `main.tsx`: Bootstraps the React app with the main component.

### `public` Directory

Contain csv file that mock the api Data `dataforuitask.csv`.

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

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Material-UI
- Jest
