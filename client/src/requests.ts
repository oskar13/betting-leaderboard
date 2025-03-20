import type { DatabaseCustomer, CustomerCountry, BettingLeaderboardEntry } from "./types";

export async function fetchCustomers(): Promise<DatabaseCustomer[]> {
    try {
        const customers = await fetch('http://localhost:3000/customers', { method: 'GET' })
        return customers.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function fetchLeaderboard(country: CustomerCountry ): Promise<BettingLeaderboardEntry[]> {
    try {
        const url = `http://localhost:3000/leaderboard?country=${country}`;
        const response = await fetch(url, { method: "GET" });
        return response.json();
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        return [];
    }
}