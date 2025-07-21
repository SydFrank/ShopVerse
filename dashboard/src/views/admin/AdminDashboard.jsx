import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

/**
 * AdminDashboard Component
 * -------------------------
 * This component serves as the main dashboard view for admin users.
 * It provides a visual summary of key metrics including:
 *  - Total Sales
 *  - Product Count
 *  - Seller Count
 *  - Order Value
 *
 * Features:
 * - Four statistical summary cards using Tailwind utility classes.
 * - Interactive bar chart using `react-apexcharts` to display trends over time.
 * - Uses static mock data for demonstration; real-time data should be fetched via API.
 *
 * Libraries:
 * - Chart rendering: react-apexcharts
 * - Icons: react-icons (Md, Fa)
 *
 * To Do:
 * - Replace static values with API-integrated live data.
 * - Enhance responsiveness for mobile views.
 * - Add tooltips and loading states for better UX.
 */

const AdminDashboard = () => {
  const state = {
    // Chart data series for three metrics: Orders, Revenues, and Sellers
    series: [
      {
        name: "Orders", // Label for the first dataset
        data: [23, 34, 45, 56, 76, 56, 34, 34, 45, 89, 55, 20], // Monthly values
      },
      {
        name: "Revenues",
        data: [16, 34, 45, 56, 64, 86, 34, 10, 22, 30, 40, 50],
      },
      {
        name: "Sellers",
        data: [35, 10, 66, 35, 80, 40, 32, 8, 55, 47, 60, 70],
      },
    ],

    // Chart appearance and configuration options
    options: {
      // Array of colors used for each series in the chart
      color: ["#181ee8", "#181ee8"],

      // Bar chart layout configuration
      plotOptions: {
        radius: 30,
      },

      // General chart configuration
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },

      // Disable value labels directly on chart bars
      dataLabels: {
        enabled: false,
      },

      // Line or bar stroke configuration (note: for bar chart, width often set to 0)
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"], // For line charts, can be 'smooth', 'straight', or 'stepline'
        lineCap: "butt", // How line ends are drawn: 'butt', 'round', or 'square'
        colors: "#f0f0f0", // Color of stroke (not used much in bar charts)
        width: 0.5, // Stroke width (minimal for bar charts)
        dashArray: 0, // Dash pattern (0 = solid line)
      },

      // X-axis labels (months of the year)
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },

      // Legend position (for series names)
      legend: {
        position: "top", // Can be 'top', 'bottom', 'left', or 'right'
      },

      // Responsive settings for different screen sizes
      responsive: [
        {
          breakpoint: 565, // Applies when screen width is less than 565px
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true, // Switch to horizontal layout for better mobile readability
              },
            },
            chart: {
              height: "550px", // Increase height on small devices for better spacing
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold ">$3432</h2>
            <span className="text-md font-medium">Total Sale</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold ">20</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdOutlineProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold ">50</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold ">$100</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaCartArrowDown className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7 ">
        <div className="w-full lg:w-7/12 lg:pr-3 ">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0 ">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6] ">
              <ol className="relative  border-slate-600 ml-4 ">
                <li className="mb-3 ml-6 ">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg "
                      src="/images/admin.jpg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-md font-normal ">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How are you
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6 ">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6] ">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((curVal, index) => (
                <tr key={index}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #34344
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    $560
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
