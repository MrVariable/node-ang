const express = require('express');
const router = express.Router();
let group = [], finalArr = [];
const employees = [
    {
        id: 1,
        name: 'Aman',
        salary: 200,
        parentId: 0
    },
    {
        id: 2,
        name: 'Pathak',
        salary: 400,
        parentId: 3
    },
    {
        id: 3,
        name: 'Urmish',
        salary: 250,
        parentId: 1
    },
    {
        id: 4,
        name: 'Sagar',
        salary: 600,
        parentId: 1
    },
    {
        id: 5,
        name: 'Mahajan',
        salary: 800,
        parentId: 4
    },
    {
        id: 6,
        name: 'Panchal',
        salary: 600,
        parentId: 4
    },
    {
        id: 7,
        name: 'Chandu',
        salary: 100,
        parentId: 5
    },
    {
        id: 8,
        name: 'Paghdal',
        salary: 600,
        parentId: 7
    }
]

router.get('/', (req, res) => {
    res.send('Working...');
});

router.get('/employees', (req, res) => {
    res.status(200).send(employees);
});

router.get('/upline-details/:empId', (req, res) => {
    finalArr = [];
    const uplineDetails = getUplineDetails(req.params.empId); 
    res.status(200).send(uplineDetails);
});

router.get('/group-salary/:empId', (req, res) => {
    group = []
    res.status(200).send(getGroupSalary(req.params.empId));
});


function getAllJuniorEmployees(empId) {
    const theEmployee = employees.find(ele => ele.id == empId);
    group.push(theEmployee);
    const juniors = employees.filter(ele => ele.parentId == empId);
    juniors.forEach(it => {
        getAllJuniorEmployees(it.id);
    })
    return group;
}

function getGroupSalary(employeeId) {
    let groupSalary = 0;
    const allJuniorEmployees = getAllJuniorEmployees(employeeId);
    groupSalary = allJuniorEmployees.reduce((a, b) => ({salary: a.salary + b.salary}));
    return groupSalary;
}

function getUplineDetails(empId) {
    const theEmployee = employees.find(ele => ele.id == empId);
    if (theEmployee) {
        finalArr.push(theEmployee);
        if (theEmployee.parentId !== 0) {
            getUplineDetails(theEmployee.parentId);
        }
    }
    return finalArr;
}

module.exports = router; 