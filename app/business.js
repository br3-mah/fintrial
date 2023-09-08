class DataRepository {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async fetchData() {
        try {
            const response = await fetch('https://demo.zamtouch.app/emc_admin/api/content/items/Busineses', {
                method: 'GET',
                headers: {
                    "api-key": this.apiKey
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    
    async postData(item) {
        try {
            const response = await fetch('https://cockpit.tld/api/pages/menus', {
                method: 'POST',
                headers: {
                    "api-key": this.apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting data:', error);
            return null;
        }
    }

    async updateData(id, updatedItem) {
        try {
            const response = await fetch(`https://cockpit.tld/api/pages/menus/${id}`, {
                method: 'PUT',
                headers: {
                    "api-key": this.apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedItem)
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating data:', error);
            return null;
        }
    }

    async deleteData(id) {
        try {
            const response = await fetch(`https://cockpit.tld/api/pages/menus/${id}`, {
                method: 'DELETE',
                headers: {
                    "api-key": this.apiKey
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete data');
            }

            // Return a success message or handle as needed
            return 'Data deleted successfully';
        } catch (error) {
            console.error('Error deleting data:', error);
            return null;
        }
    }

    displayDataInGrid(data) {
        const dataGrid = document.getElementById('data-grid');
        // Get a reference to the loader element and the button
        const loader = document.querySelector('.loader');
        // Clear existing content
        dataGrid.innerHTML = '';

        // Assuming data is an array of items
        // Iterate over the data and create grid items
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'grid-item';

            // Create a card content with additional information
            // <p>Description: ${item.description}</p>
            const content = `
                <table>
                    <caption><h2>${item.name}</h2></caption>
                    <tr>
                        <td>Asking Price:</td>
                        <td>K${item.asking_price}</td>
                    </tr>
                    <tr>
                        <td>Gross Revenue:</td>
                        <td>K${item.gross_revenue}</td>
                    </tr>
                    <tr>
                        <td>Cash Flow:</td>
                        <td>K${item.cash_flow}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${item.address}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="btn-default btn-awesome">Buy Now</button></td>
                    </tr>
                </table>
            `;

            itemElement.innerHTML = content;

            // Append the item element to the grid container
            dataGrid.appendChild(itemElement);
        });
        loader.style.display = 'none';

    }
}





// Create an instance of the DataRepository and initiate it on page load
document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'USR-5c5bf2c54c32edb7e30e9c1f2b6491b8502aed34';
    const repository = new DataRepository(apiKey);

    // Fetch data and display it in the grid
    const data = await repository.fetchData();
    console.log(data);
    repository.displayDataInGrid(data);

        // // Example of posting data (replace with your data)
        // const newItem = { name: 'New Menu Item', price: 10.99 };
        // const postedItem = await repository.postData(newItem);
        // console.log('Posted item:', postedItem);
    
        // // Example of updating data (replace with your data)
        // const updatedItem = { name: 'Updated Menu Item', price: 12.99 };
        // const updatedData = await repository.updateData(1, updatedItem);
        // console.log('Updated data:', updatedData);
            
        // // Example of deleting data (replace with your data)
        // const deleteResult = await repository.deleteData(2);
        // console.log('Delete result:', deleteResult);
});
