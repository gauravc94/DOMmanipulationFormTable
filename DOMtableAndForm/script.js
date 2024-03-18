document.addEventListener("DOMContentLoaded", function() {
    createForm();
    createTable();
});

function createForm() {
    const form = document.createElement('form');
    form.id = 'userForm';

    const formElements = [
        { label: 'First Name:', type: 'text', id: 'firstName', name: 'firstName', required: true },
        { label: 'Last Name:', type: 'text', id: 'lastName', name: 'lastName', required: true },
        { label: 'Address:', type: 'text', id: 'address', name: 'address', required: true },
        { label: 'Pincode:', type: 'text', id: 'pincode', name: 'pincode', required: true },
        { label: 'Gender:', type: 'select', id: 'gender', name: 'gender', required: true, options: ['Male', 'Female', 'Other'] },
        { label: 'Choice of Food (Select at least 2):', type: 'checkbox', name: 'food', values: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sushi'] },
        { label: 'State:', type: 'text', id: 'state', name: 'state', required: true },
        { label: 'Country:', type: 'text', id: 'country', name: 'country', required: true }
    ];

    formElements.forEach(element => {
        const label = document.createElement('label');
        label.textContent = element.label;
        form.appendChild(label);

        if (element.type === 'select') {
            const select = document.createElement('select');
            select.id = element.id;
            select.name = element.name;
            select.required = element.required;
            element.options.forEach(option => {
                const optionElem = document.createElement('option');
                optionElem.value = option.toLowerCase();
                optionElem.textContent = option;
                select.appendChild(optionElem);
            });
            form.appendChild(select);
        } else if (element.type === 'checkbox') {
            element.values.forEach(value => {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = value.toLowerCase();
                input.name = element.name;
                input.value = value.toLowerCase();
                const checkboxLabel = document.createElement('label');
                checkboxLabel.textContent = value;
                const divCheckFood = document.createElement('div')
                divCheckFood.append(input)
                divCheckFood.append(checkboxLabel)
                form.appendChild(divCheckFood)
            });
        } else {
            const input = document.createElement('input');
            input.type = element.type;
            input.id = element.id;
            input.name = element.name;
            input.required = element.required;
            form.appendChild(input);
        }

        form.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', submitForm);
    form.appendChild(submitButton);

    document.body.insertBefore(form, document.getElementById('userTable'));
}

function createTable() {
    const table = document.createElement('table');
    table.id = 'userTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['First Name', 'Last Name', 'Address', 'Pincode', 'Gender', 'Food', 'State', 'Country'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    document.body.appendChild(table);
}

function submitForm() {
    const form = document.getElementById('userForm');
    const formData = new FormData(form);

    const selectedFood = [];
    formData.getAll('food').forEach(food => {
        selectedFood.push(food);
    });

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const address = formData.get('address');
    const pincode = formData.get('pincode');
    const gender = formData.get('gender');
    const state = formData.get('state');
    const country = formData.get('country');

    if (!validateForm(firstName, lastName, address, pincode, state, country, selectedFood.length)) {
        return;
    }

    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);

    const cells = [firstName, lastName, address, pincode, gender, selectedFood.join(', '), state, country];
    cells.forEach((cellData, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = cellData;
    });

    form.reset();
}

function validateForm(firstName, lastName, address, pincode, state, country, selectedFoodCount) {
    if (!firstName || !lastName || !address || !pincode || !state || !country || selectedFoodCount < 2) {
        alert("Please fill in all fields and select at least 2 food items.");
        return false;
    }
    return true;
}

