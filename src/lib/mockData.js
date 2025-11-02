import { faker } from '@faker-js/faker';

const createRandomUser = (role) => {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    role: role,
    course: role === 'Student' ? faker.helpers.arrayElement(['Computer Science', 'Mechanical Eng.', 'Business Admin.', 'Electrical Eng.']) : null,
    contact: faker.phone.number(),
  };
};

const createRandomRoom = () => {
    const status = faker.helpers.arrayElement(['Occupied', 'Vacant', 'Maintenance']);
    return {
        id: faker.string.uuid(),
        roomNumber: faker.number.int({ min: 101, max: 420 }),
        type: faker.helpers.arrayElement(['Single', 'Double', 'Triple']),
        status: status,
        occupants: status === 'Occupied' ? faker.number.int({ min: 1, max: 2 }) : 0,
    };
};

const createRandomFee = (studentName) => {
    return {
        id: faker.string.uuid(),
        studentName: studentName,
        amount: faker.finance.amount(500, 1000, 2, '$'),
        dueDate: faker.date.future(),
        status: faker.helpers.arrayElement(['Paid', 'Due', 'Overdue']),
        paymentDate: faker.date.past(),
    };
};

const createRandomVisitor = (studentName) => {
    const checkIn = faker.date.recent();
    const status = faker.helpers.arrayElement(['In', 'Out']);
    return {
        id: faker.string.uuid(),
        visitorName: faker.person.fullName(),
        studentName: studentName,
        checkInTime: checkIn,
        checkOutTime: status === 'Out' ? faker.date.between({ from: checkIn, to: new Date() }) : null,
        status: status,
    };
};

const createRandomMaintenance = (studentName) => {
    return {
        id: faker.string.uuid(),
        issue: faker.helpers.arrayElement(['Leaky Faucet', 'Broken Light', 'Wi-Fi Down', 'AC Not Cooling']),
        roomNumber: faker.number.int({ min: 101, max: 420 }),
        reportedBy: studentName,
        date: faker.date.recent(),
        status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Resolved']),
    };
};


export const students = faker.helpers.multiple(() => createRandomUser('Student'), { count: 25 });
export const rooms = faker.helpers.multiple(createRandomRoom, { count: 50 });
export const fees = students.map(student => createRandomFee(student.fullName));
export const visitors = faker.helpers.multiple(() => createRandomVisitor(faker.helpers.arrayElement(students).fullName), { count: 40 });
export const maintenanceRequests = faker.helpers.multiple(() => createRandomMaintenance(faker.helpers.arrayElement(students).fullName), { count: 15 });
