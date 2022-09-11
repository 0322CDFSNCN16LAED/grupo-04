import LastUser from "./LastUser";
import MiniCard from "./MiniCard";
import { useState, useEffect } from "react";
import PresupuestosPorRubro from "./budget/PresupuestosPorRubro";

const EXPRESS_HOST = "http://localhost:3001/api";

const Dashboard = () => {
  const [countByCategory, setCountByCategory] = useState({});
  const [lastUser, setLastUser] = useState();
  const [lastBudgetRes, setLastBudgetRes] = useState();

  const [isBudgetLoading, setIsBudgetLoading] = useState(false);
  const [isBudgetResLoading, setIsBudgetResLoading] = useState(false);
  const [isBudgetPurchasedLoading, setIsBudgetPurchasedLoading] =
    useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isRubrosLoading, setIsRubrosLoading] = useState(false);

  const [budgetAmount, setBudgetAmount] = useState(0);
  const [responsesAmount, setResponsesAmount] = useState(0);
  const [usersAmount, setUsersAmount] = useState(0);
  const [profAmount, setProfAmount] = useState(0);
  const [clientAmount, setClientAmount] = useState(0);
  const [rubrosAmount, setRubrosAmount] = useState(0);
  const [purchasedAmount, setPurchasedAmount] = useState(0);

  const fetchBudgetAmount = async () => {
    try {
      setIsBudgetLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget`);
      const budgetsResult = await result.json();
      setBudgetAmount(budgetsResult.count);
      setCountByCategory(budgetsResult.countByCategory);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBudgetLoading(false);
    }
  };
  const fetchBudgetResponse = async () => {
    try {
      setIsBudgetResLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/response`);
      const budgetsResult = await result.json();
      setLastBudgetRes(budgetsResult.responses[0]);
      setResponsesAmount(budgetsResult.count);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBudgetResLoading(false);
    }
  };
  const fetchBudgetPurchased = async () => {
    try {
      setIsBudgetPurchasedLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/purchased`);
      const budgetsResult = await result.json();
      setPurchasedAmount(budgetsResult.count);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBudgetPurchasedLoading(false);
    }
  };
  const fetchUsersAmount = async () => {
    try {
      setIsUsersLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/users`);
      const usersResult = await result.json();
      setUsersAmount(usersResult.count);
      setProfAmount(usersResult.profCount);
      setClientAmount(usersResult.clientCount);
      setLastUser(usersResult.users[0]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUsersLoading(false);
    }
  };
  const fetchRubrosAmount = async () => {
    try {
      setIsRubrosLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/rubros`);
      const rubrosResult = await result.json();
      setRubrosAmount(rubrosResult.count);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsRubrosLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching budget amount");
    fetchBudgetAmount();
    fetchUsersAmount();
    fetchRubrosAmount();
    fetchBudgetResponse();
    fetchBudgetPurchased();
  }, []);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>

      <div className="row">
        {isBudgetLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de presupuestos pedidos"
            value={budgetAmount.toString()}
            icon="fa-user-cog"
            color="danger"
          />
        )}
        {isBudgetLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de presupuestos Respondidos"
            value={responsesAmount.toString()}
            icon="fa-user-cog"
            color="danger"
          />
        )}
        {isBudgetPurchasedLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de presupuestos Contratados"
            value={purchasedAmount.toString()}
            icon="fa-user-cog"
            color="danger"
          />
        )}
        {isUsersLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de Profesionales"
            value={profAmount.toString()}
            icon="fa-user-hard-hat"
          />
        )}
        {isUsersLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de Clientes"
            value={clientAmount.toString()}
            icon="fa-user-hard-hat"
          />
        )}
        {isUsersLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de clientes y profesionales"
            value={usersAmount.toString()}
            icon="fa-user-hard-hat"
          />
        )}
        {isRubrosLoading ? (
          <p>Loading...</p>
        ) : (
          <MiniCard
            title="Total de rubros"
            value={rubrosAmount.toString()}
            icon="fa-user"
            color="secondary"
          />
        )}
      </div>

      <div className="row">
        {lastUser && lastBudgetRes && !isBudgetResLoading && !isUsersLoading ? (
          <LastUser lastUser={lastUser} lastBudgetRes={lastBudgetRes} />
        ) : (
          <p>Loading...</p>
        )}

        <PresupuestosPorRubro countByCategory={countByCategory} />
      </div>
    </>
  );
};
export default Dashboard;
