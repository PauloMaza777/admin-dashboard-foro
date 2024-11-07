// src/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { getUsersCountByDate, getPostsCount, getPostsCount2 } from "./adminService";
import { Timestamp } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({ week: 0, month: 0, year: 0 });
  const [postsCount, setPostsCount] = useState(0);
  const [postsCount2, setPostsCount2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const now = Timestamp.now();

      // Calcular fechas de inicio para la última semana, mes y año
      const lastWeek = new Timestamp(now.seconds - 7 * 24 * 60 * 60, 0);
      const lastMonth = new Timestamp(now.seconds - 30 * 24 * 60 * 60, 0);
      const lastYear = new Timestamp(now.seconds - 365 * 24 * 60 * 60, 0);

      // Obtener el número de usuarios registrados en la última semana, mes y año
      const weekCount = await getUsersCountByDate(lastWeek);
      const monthCount = await getUsersCountByDate(lastMonth);
      const yearCount = await getUsersCountByDate(lastYear);

      // Obtener el número total de publicaciones
      const posts = await getPostsCount();
      const posts2 = await getPostsCount2();

      setUserStats({ week: weekCount, month: monthCount, year: yearCount });
      setPostsCount(posts);
      setPostsCount2(posts2);
    };

    fetchData();
  }, []);

  // Datos y opciones para el gráfico de usuarios
  const userData = {
    labels: ["Última semana", "Último mes", "Último año"],
    datasets: [
      {
        label: "Usuarios Registrados",
        data: [userStats.week, userStats.month, userStats.year],
        backgroundColor: ["#B73AE0", "#F5E3A2", "#F56E1D"],
      },
    ],
  };

  // Datos y opciones para el gráfico de publicaciones de E-Sports
  const esportsData = {
    labels: ["Publicaciones de E-Sports"],
    datasets: [
      {
        label: "Total de Publicaciones",
        data: [postsCount],
        backgroundColor: ["#F56E1D"],

      },
    ],
  };

  // Datos y opciones para el gráfico de publicaciones de noticias
  const newsData = {
    labels: ["Publicaciones de Noticias"],
    datasets: [
      {
        label: "Total de Publicaciones",
        data: [postsCount2],
        backgroundColor: ["#B73AE0"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h1>Administrador - Estadísticas</h1>

      <div style={{ width: "80%", margin: "auto", marginBottom: "40px" }}>
        <h3>Usuarios Registrados</h3>
        <Bar data={userData} options={{ ...options, plugins: { ...options.plugins, title: { text: "Usuarios Registrados", display: true }}}}/>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div style={{ width: "45%", marginBottom: "40px" }}>
          <h3>Publicaciones de los E-Sports</h3>
          <Bar data={esportsData} options={{ ...options, plugins: { ...options.plugins, title: { text: "Publicaciones de E-Sports", display: true }}}}/>
        </div>

        <div style={{ width: "45%", marginBottom: "40px" }}>
          <h3>Publicaciones de las Noticias</h3>
          <Bar data={newsData} options={{ ...options, plugins: { ...options.plugins, title: { text: "Publicaciones de Noticias", display: true }}}}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
