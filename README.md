```
bun install
bun run dev
```

```
open http://localhost:3000
```


# Database Design:

## Explanation 
This database focuses on simplicity and adhering to strict rules of foreign key relations within the database rather than being software defined at the API level.

A key issue to solve was the problem of multiple budget categories. This would come into effect when adding transactions to the bankTransactions table and the transactions were a main Current Account. To ensure that a foreign key could be defined, inheritance is introduced by defining a route budget table and two sub tables of savings and debt to add in the required mapping fields to the relevant entity it is attached to.

With regards to the transactions, as discussed above briefly, some transactions will need to be mapped to a category and others not, such as savings/pension statements. These types of transactions could have been moved into a separate table but this could introduce more overhead with relationships. As these do not require a category, a separate small table is added that may contain a transactionID that can then be mapped to a budget category if requried.

## Overview
![DB Diagram Design](./assets/Financial%20Tracker.svg)