import { db } from '../knex';

export const getBettingLeaderboard = async (countryFilter?: string) => {
    const baseQuery = db('customer')
        .join('bet', 'customer.id', 'bet.customer_id')
        .whereNot('bet.status', 'PENDING')
        .groupBy('customer.id')
        .select(
            'customer.id',
            'customer.first_name',
            'customer.last_name',
            'customer.country',
            db.raw('COUNT(bet.id) AS total_bets'),
            db.raw(`
                ROUND(
                    100.0 * SUM(CASE WHEN bet.status = 'WON' THEN 1 ELSE 0 END) / COUNT(bet.customer_id),
                    0
                ) AS win_percentage
            `),
            db.raw(`
                (
                    SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds - bet.stake) ELSE 0 END) 
                    - 
                    SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END)
                ) AS profit
            `)
        )
        .havingRaw(`
            (
                SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds - bet.stake) ELSE 0 END) 
                - 
                SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END)
            ) > 0
        `) //Chat GPT helped me with this one.
        .orderBy('profit', 'desc')
        .limit(10);

    if (countryFilter && countryFilter !=='ALL') {
        baseQuery.where('customer.country', countryFilter);
    }

    return baseQuery;
};