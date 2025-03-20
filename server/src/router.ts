import { Router } from 'express';
import { getCustomers } from './db/queries/customer';
import { getBettingLeaderboard } from './db/queries/bet_stats';

export const router = Router();

router.get('/customers', async (req, res) => {
    const customers = await getCustomers();
    res.json(customers);
});

router.get('/leaderboard', async (req, res) => {
    const country = req.query.country as string | undefined;
    const leaderboard = await getBettingLeaderboard(country);
    res.json(leaderboard);
});
