# Next.js-Frontend-Application
this project is a frontend application developed with Next.js. It fetches data from a sample API (JSONPlaceholder) and displays it in a paginated table with search and sorting functionalities. Additionally, it includes a graph to visualize data distribution.

## Project Structure

- `app/`: Contains the main application pages.
  - `page.js`: The home page that renders the `DataTable` component.
- `components/`: Contains reusable React components.
  - `DataTable.js`: The component for displaying and interacting with the table.
  - `Graph.js`: The component for visualizing data distribution using a bar chart.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/nextjs-frontend-app.git
    cd nextjs-frontend-app
    ```

2. Install the dependencies
    ```bash
    npm install
    ```
This project uses the following dependencies:
- Next.js
- React
- Axios
- Chart.js
- react-chartjs-2
  

### Running the Application

1. Start the development server
    ```bash
    npm run dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.


### How to test the Features
- **Pagination:** Use the buttons at the bottom of the table to navigate between pages.
- **Search:** Enter a keyword in the search input to filter the table data.
- **Sorting:** Click on the table headers to sort the data in ascending or descending order.
- **Graph:** View the graph at the bottom of the page to see the distribution of post lengths.
