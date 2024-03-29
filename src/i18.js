// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const storedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    us: {
      translation: {
        title_dashboard: "Dashboard",
        title_graphics: "Graphics",
        menu_dashboard: "Dashboard",
        menu_graphics: "Graphics",
        menu_users: "Users",
        menu_transactions: "Transactions",
        menu_help: "Help",
        menu_companies: "Companies",
        menu_clients: "Clients",
        menu_moderators: "Moderators",
        menu_logout: "Logout",
        menu_memberships: "Memberships",
        menu_membership_create: "Create",
        menu_membership_edit: "Edit",
        menu_ubications: "Ubications",
        menu_ubications_country: "Countries",
        menu_ubications_state: "States",
        menu_ubications_city: "Cities",
        menut_packages: "Packages",
        dashboard_welcome: "Welcome,",
        dashboard_sales: "Sales",
        dashboard_clients: "Clients",
        dashboard_companies: "Companies",
        dashboard_videos: "Videos playing",
        dashboard_last_orders: "Last orders",
        dashboard_table_order: "Order",
        dashboard_table_client: "Client",
        dashboard_table_amount: "Amount",
        dashboard_table_state: "State",
        dashboard_table_date: "Date",
        users_companies_title: "Companies",
        users_clients_title: "Clients",
        users_moderators_title: "Moderators",
        table_row_per_page: "Rows per page:",
        table_name: "Name",
        table_email: "Email",
        table_country: "Country",
        table_state: "State",
        table_last_login: "Last login",
        table_actions: "Actions",
        search_company_placeholder: "Search company",
        edit_company_profile: "Edit company profile",
        edit_client_profile: "Edit client profile",
        edit_moderator_profile: "Edit moderator profile",
        edit_save_changes: "Save changes",
      },
    },
    es: {
      translation: {
        title_dashboard: "Panel Administrativo",
        title_graphics: "Graficas",
        menu_dashboard: "Panel",
        menu_graphics: "Graficas",
        menu_users: "Usuarios",
        menu_transactions: "Transacciones",
        menu_help: "Ayuda",
        menu_companies: "Empresas",
        menu_clients: "Clientes",
        menu_moderators: "Moderadores",
        menu_logout: "Cerrar sesión",
        menu_memberships: "Membresías",
        menu_membership_create: "Crear",
        menu_membership_edit: "Editar",
        menu_ubications: "Ubicaciones",
        menu_ubications_country: "Países",
        menu_ubications_state: "Estados",
        menu_ubications_city: "Ciudades",
        menut_packages: "Paquetes",
        dashboard_welcome: "Bienvenido,",
        dashboard_sales: "Ventas",
        dashboard_clients: "Usuarios Clientes",
        dashboard_companies: "Usuarios Empresas",
        dashboard_videos: "En reproducción",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEN",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "CANTIDAD",
        dashboard_table_state: "ESTADO",
        dashboard_table_date: "FECHA",
        users_companies_title: "Empresas",
        users_clients_title: "Clientes",
        users_moderators_title: "Moderadores",
        table_row_per_page: "Filas por página:",
        table_name: "Nombre",
        table_email: "Correo",
        table_country: "País",
        table_state: "Estado",
        table_last_login: "Último inicio de sesión",
        table_actions: "Acciones",
        search_company_placeholder: "Buscar empresa",
        edit_company_profile: "Editar perfil de empresa",
        edit_client_profile: "Editar perfil de cliente",
        edit_moderator_profile: "Editar perfil de moderador",
        edit_save_changes: "Guardar cambios",
      },
    },
    pt: {
      translation: {
        title_dashboard: "Painel Administrativo",
        title_graphics: "Gráficos",
        menu_dashboard: "Painel",
        menu_graphics: "Gráficos",
        menu_users: "Usuários",
        menu_transactions: "Transações",
        menu_help: "Ajuda",
        menu_companies: "Empresas",
        menu_clients: "Clientes",
        menu_moderators: "Moderadores",
        menu_logout: "Sair",
        menu_memberships: "Membros",
        menu_membership_create: "Criar",
        menu_membership_edit: "Editar",
        menu_ubications: "Ubicações",
        menu_ubications_country: "Países",
        menu_ubications_state: "Estados",
        menu_ubications_city: "Cidades",
        menut_packages: "Pacotes",
        dashboard_welcome: "Bem-vindo,",
        dashboard_sales: "Vendas",
        dashboard_clients: "Clientes",
        dashboard_companies: "Empresas",
        dashboard_videos: "em reprodução",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEM",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "QUANTIDADE",
        dashboard_table_state: "ESTADO",
        dashboard_table_date: "DATA",
        users_companies_title: "Empresas",
        users_clients_title: "Clientes",
        users_moderators_title: "Moderadores",
        table_row_per_page: "Linhas por página:",
        table_name: "Nome",
        table_email: "Email",
        table_country: "País",
        table_state: "Estado",
        table_last_login: "Último login",
        table_actions: "Ações",
        search_company_placeholder: "Pesquisar empresa",
        edit_company_profile: "Editar perfil da empresa",
        edit_client_profile: "Editar perfil do cliente",
        edit_moderator_profile: "Editar perfil do moderador",
        edit_save_changes: "Salvar alterações",
      },
    },
  },
  lng: storedLanguage || "us",
  fallbackLng: "us",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
