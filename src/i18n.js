// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const storedLanguage = localStorage.getItem("language");
console.log(storedLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: {
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
        menu_distributors: "Distributors",
        menu_logout: "Logout",
        menu_memberships: "Memberships",
        menu_membership_create: "Create",
        menu_membership_edit: "Edit",
        menu_membership_eliminated: "Eliminated",
        menu_ubications: "Ubications",
        menu_ubications_country: "Countries",
        menu_ubications_state: "States",
        menu_ubications_city: "Cities",
        menut_packages: "Packages",
        menu_package_create: "Create",
        menu_package_list: "List",
        modal_text: "Are you sure you want to logout?",
        modal_cancel: "Cancel",
        logout: "Yes, logout",
        dashboard_welcome: "Welcome,",
        dashboard_sales: "Sales",
        dashboard_clients: "Clients",
        dashboard_companies: "Companies",
        dashboard_distributors: "Distributors",
        dashboard_last_orders: "Last orders",
        dashboard_table_client: "Client",
        dashboard_table_amount: "Amount",
        dashboard_table_description: "Description",
        dashboard_table_createdAt: "Date",
        dashboard_table_type: "TYPE",
        users_companies_title: "Companies",
        users_clients_title: "Clients",
        users_moderators_title: "Moderators",
        users_distributors_title: "Distributors",
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
        no_transactions_to_display: "No transactions to display",
        transactions_rockobits_date: "Date",
        transactions_rockobits_amount: "Amount",
        transactions_rockobits_emmiter: "Emmiter",
        transactions_rockobits_receiver: "Receiver",
        select_country: "Select a country",
        all_countries: "All countries",
        transaction_filter_membership: "Memberships",
        transaction_filter_rockobits: "Rockobits",
        transaction_filter_screen: "Screens",
        transactions_rockobits_type: "Type",
        transaction_rockobits_type_transfer_client: "Transfer to Client",
        transaction_rockobits_type_transfer_employee: "Transfer to Employee",
        transaction_rockobits_type_pay_music: "Pay Music",
        transaction_rockobits_type_claim_qr: "Claim Rockobits(QR)",
        transaction_rockobits_type_rockobits: "Buy Rockobits",
        transaction_rockobits_type_revoke: "Revoke Rockobits to Employee",
        transaction_pay_company: "Company/Distributor",
        transaction_pay_type: "Type",
        transaction_pay_date: "Date",
        transaction_pay_amount: "Amount",
        transaction_pay_type_membership: "Purchasing membership",
        transaction_pay_type_rockobits: "Purchase of",
        transaction_pay_type_screen: "Purchase of",
        transaction_qr_date: "Date",
        transaction_qr_amount: "Amount",
        transaction_qr_type: "Type",
        transaction_qr_company_employee: "Company/Employee",
        transaction_qr_type_generate: "QR generation",
        transaction_qr_type_cancel: "Cancel QR",
        transaction_qr_type_claim: "QR code claimed",
        transaction_qr_company: "Company",
        transaction_qr_employee: "Employee",
        pagination_rows_per_page: "Rows per page:",
        pagination_of: "of",
        pagination_more_than: "More than",
        pagination_next: "Next",
        pagination_back: "Back",
        loading: "Loading...",
        language_snackbar_message: "Language updated successfully",
        language_snackbar_error: "Error updating language",
        membership_create: "Create Membership",
        monthly_memberships: "Monthly",
        yearly_memberships: "Yearly",
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
        menu_distributors: "Distribuidores",
        menu_logout: "Cerrar sesión",
        menu_memberships: "Membresías",
        menu_membership_create: "Crear",
        menu_membership_edit: "Editar",
        menu_membership_eliminated: "Eliminadas",
        menu_ubications: "Ubicaciones",
        menu_ubications_country: "Países",
        menu_ubications_state: "Estados",
        menu_ubications_city: "Ciudades",
        menut_packages: "Paquetes",
        menu_package_create: "Crear",
        menu_package_list: "Lista",
        modal_text: "¿Estás seguro de que quieres cerrar la sesión?",
        modal_cancel: "Cancelar",
        dashboard_welcome: "Bienvenido,",
        dashboard_sales: "Ventas",
        dashboard_clients: "Usuarios Clientes",
        dashboard_companies: "Usuarios Empresas",
        dashboard_distributors: "Distribuidores",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEN",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "CANTIDAD",
        dashboard_table_description: "DESCRIPCION",
        dashboard_table_createdAt: "FECHA",
        dashboard_table_type: "TIPO",
        users_companies_title: "Empresas",
        users_distributors_title: "Distribuidores",
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
        no_transactions_to_display: "No hay transacciones para visualizar",
        transaction_filter_memberships: "Membresías",
        transaction_filter_rockobits: "Rockobits",
        transaction_filter_screen: "Pantallas",
        transactions_rockobits_date: "Fecha",
        transactions_rockobits_amount: "Cantidad",
        transactions_rockobits_emmiter: "Emisor",
        transactions_rockobits_receiver: "Receptor",
        select_country: "Selecciona un país",
        all_countries: "Todos los países",
        transactions_rockobits_type: "Tipo",
        transaction_rockobits_type_transfer_client: "Transferencia a Cliente",
        transaction_rockobits_type_transfer_employee:
          "Transferencia a Empleado",
        transaction_rockobits_type_pay_music: "Pagar Música",
        transaction_rockobits_type_claim_qr: "Reclamar Rockobits(QR)",
        transaction_rockobits_type_rockobits: "Comprar Rockobits",
        transaction_rockobits_type_revoke: "Revocar Rockobits a Empleado",
        transaction_pay_company: "Empresa/Distribuidor",
        transaction_pay_type: "Tipo",
        transaction_pay_date: "Fecha",
        transaction_pay_amount: "Cantidad",
        transaction_pay_type_membership: "Compra de membresía",
        transaction_pay_type_rockobits: "Compra de",
        transaction_pay_type_screen: "Compra de",
        transaction_qr_date: "Fecha",
        transaction_qr_amount: "Cantidad",
        transaction_qr_type: "Tipo",
        transaction_qr_company_employee: "Empresa/Empleado",
        transaction_qr_type_generate: "Generacion de QR",
        transaction_qr_type_cancel: "Cancelacion de QR",
        transaction_qr_type_claim: "Codigo de QR reclamado",
        transaction_qr_company: "Empresa",
        transaction_qr_employee: "Empleado",
        pagination_rows_per_page: "Filas por página:",
        pagination_of: "de",
        pagination_more_than: "Más de",
        pagination_next: "Siguiente",
        pagination_back: "Atrás",
        loading: "Cargando...",
        language_snackbar_message: "Idioma actualizado correctamente",
        language_snackbar_error: "Error al actualizar idioma",
        membership_create: "Crear Membresía",
        monthly_memberships: "Mensual",
        yearly_memberships: "Anual",
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
        menu_distributors: "Distribuidores",
        menu_logout: "Sair",
        menu_memberships: "Membros",
        menu_membership_create: "Criar",
        menu_membership_edit: "Editar",
        menu_membership_eliminated: "Eliminadas",
        menu_ubications: "Ubicações",
        menu_ubications_country: "Países",
        menu_ubications_state: "Estados",
        menu_ubications_city: "Cidades",
        menut_packages: "Pacotes",
        menu_package_create: "Criar",
        menu_package_list: "Listar",
        modal_text: "Você tem certeza que deseja sair?",
        modal_cancel: "Cancelar",
        logout: "Sim, sair",
        dashboard_welcome: "Bem-vindo,",
        dashboard_sales: "Vendas",
        dashboard_clients: "Clientes",
        dashboard_companies: "Empresas",
        dashboard_distributors: "Distribuidores",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEM",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "QUANTIDADE",
        dashboard_table_description: "DESCRIPCION",
        dashboard_table_createdAt: "DATA",
        dashboard_table_type: "TIPO",
        users_companies_title: "Empresas",
        users_distributors_title: "Distribuidores",
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
        no_transactions_to_display: "Não há transações para exibir",
        transaction_filter_memberships: "Membros",
        transaction_filter_rockobits: "Rockobits",
        transaction_filter_screen: "Telas",
        transactions_rockobits_date: "Data",
        transactions_rockobits_amount: "Quantidade",
        transactions_rockobits_emmiter: "Emissor",
        transactions_rockobits_receiver: "Receptor",
        select_country: "Selecione um país",
        all_countries: "Todos os países",
        transactions_rockobits_type: "Tipo",
        transaction_rockobits_type_transfer_client:
          "Transferência para Cliente",
        transaction_rockobits_type_transfer_employee:
          "Transferência para Funcionário",
        transaction_rockobits_type_pay_music: "Pagar Música",
        transaction_rockobits_type_claim_qr: "Reivindicar Rockobits(QR)",
        transaction_rockobits_type_rockobits: "Comprar Rockobits",
        transaction_rockobits_type_revoke: "Revogar Rockobits para Funcionário",
        transaction_pay_company: "Empresa/Distribuidor",
        transaction_pay_type: "Tipo",
        transaction_pay_date: "Data",
        transaction_pay_amount: "Quantidade",
        transaction_pay_type_membership: "Compra de membro",
        transaction_pay_type_rockobits: "Compra de",
        transaction_pay_type_screen: "Compra de",
        transaction_qr_date: "Data",
        transaction_qr_amount: "Quantidade",
        transaction_qr_type: "Tipo",
        transaction_qr_company_employee: "Empresa/Funcionário",
        transaction_qr_type_generate: "Geração de QR",
        transaction_qr_type_cancel: "Cancelar QR",
        transaction_qr_type_claim: "Código QR reivindicado",
        transaction_qr_company: "Empresa",
        transaction_qr_employee: "Funcionário",
        pagination_rows_per_page: "Linhas por página:",
        pagination_of: "de",
        pagination_more_than: "Mais de",
        pagination_next: "Próximo",
        pagination_back: "Voltar",
        loading: "Carregando...",
        language_snackbar_message: "Idioma atualizado com sucesso",
        language_snackbar_error: "Erro ao atualizar idioma",
        membership_create: "Criar Membro",
        monthly_memberships: "Mensal",
        yearly_memberships: "Anual",
      },
    },
  },
  lng: storedLanguage || "en",
  fallbackLng: ["en", "es", "pt"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
