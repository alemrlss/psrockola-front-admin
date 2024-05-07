import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import api from "../../../api/api";
import TableComponent from "../../../components/Users/Distributors/Table";
import TablePagination from "@mui/material/TablePagination";

const Distributors = () => {
  // Data table states
  const [distributors, setDistributors] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Loading and error table states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  //const [searchTerm, setSearchTerm] = useState(undefined);
  //const [stateCompany, setStateCompany] = useState(undefined);
  //const [country, setCountry] = useState(undefined);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deletedUserId, setDeletedUserId] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/distributor", {
          params: {
            take: rowsPerPage,
            skip: page * rowsPerPage,
            //searchTerm: searchTerm?.trim() ? searchTerm : undefined,
            //state_User: stateCompany ? stateCompany : undefined,
            //country: country ? country : undefined,
          },
        });
        setDistributors(response.data.data.distributors);
        setTotalCount(response.data.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Hubo un error al obtener los datos. Por favor, intenta de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage, deletedUserId]);

  // Change user state (active/inactive/banned)
  const handleToggleChange = async (id, currentState) => {
    try {
      setLoading(true);
      const newState = currentState;

      await api.patch(`/distributor/change-state/${id}`, { state: newState });

      setDistributors((prevDistributors) =>
        prevDistributors.map((company) =>
          company.id === id ? { ...company, state_User: newState } : company
        )
      );
    } catch (error) {
      console.error("Error changing user state:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update local company
  const updateLocalCompany = (companyId, updatedData) => {
    setDistributors((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, ...updatedData } : company
      )
    );
  };

  // Modal functions
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCompany(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCompany(null);
    setIsDeleteModalOpen(false);
  };

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchSelectedCompanyDetails = async (companyId) => {
    try {
      const response = await api.get(`/user/${companyId}`);
      setSelectedCompany(response.data.data);
    } catch (error) {
      console.error("Error fetching selected company details:", error);
    }
  };
  const openEditModalCompany = async (company) => {
    await fetchSelectedCompanyDetails(company.id);
    openEditModal(company);
  };
  return (
    <section style={{ overflow: "auto" }}>
      <h2 className="font-bold text-[#555CB3] text-2xl my-2">
        {t("users_distributors_title")}
      </h2>

      <TableComponent
        loading={loading}
        companies={distributors}
        handleToggleChange={handleToggleChange}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        handleChangePage={handleChangePage}
        error={error}
        setCompanies={setDistributors}
        openEditModalCompany={openEditModalCompany}
      />
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
        labelRowsPerPage={t("table_row_per_page")}
      />
    </section>
  );
};

export default Distributors;
