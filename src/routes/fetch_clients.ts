import express from 'express';
import { Banker } from '../entities/Banker';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';

const router = express.Router();



router.get('/api/clients', async (req, res) => {
	

    
	const clients = await createQueryBuilder(
		'client'
	)
		.select('client.first_name')
		.from(Client, 'client')
		.leftJoinAndSelect(
			'client.transactions',
			'transaction'
		)
		.where('client.active = :active', {
			active: true,
		})
		.getMany();

	return res.json(clients);
});

export { router as fetchClientsRouter };

router.post('/api/clients/add', async (req, res) => {
	

    const {firstName ,lastName , employeeNumber ,cardNumber , email} = req.body
    
	const clients = await createQueryBuilder(
		'client'
	)
		.insert()
		.into(Client)
        .values([{
            first_name:firstName,
            last_name:lastName,
            email:email,
            card_number:cardNumber
        }])
		.execute();

	return res.json(clients);
});

router.put('/api/clients/update/:id', async (req, res) => {
	

    const {firstName ,lastName ,cardNumber , email} = req.body;

    const {id} = req.params;
    
	const clients = await createQueryBuilder(
		'client'
	)
		.update(Client)
        .set({
            first_name:firstName,
            
        })
        .where("id = :id", { id: id })
		.execute();

	return res.json(clients);
});

router.delete('/api/clients/delete/:id', async (req, res) => {
	

   

    const {id} = req.params;
    
	
    
	const clients = await createQueryBuilder(
		'client'
	)
    .delete()
    .from(Client)
        .where("id = :id", { id: id })
		.execute();

	return res.json(clients);
});


