document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const barangaySelect = document.getElementById('barangay');
    const messageDiv = document.getElementById('message');
    const form = document.getElementById('registrationForm');

    // Fetch all regions and populate the Region dropdown
    fetch('https://psgc.cloud/api/regions')
        .then(response => response.json())
        .then(data => {
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.code;
                option.textContent = region.name;
                regionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching regions:', error));

    // Populate provinces based on selected region
    regionSelect.addEventListener('change', (e) => {
        const regionCode = e.target.value;
        provinceSelect.innerHTML = '<option value="">Select Province</option>';
        citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

        if (regionCode) {
            fetch(`https://psgc.cloud/api/regions/${regionCode}/provinces`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(province => {
                        const option = document.createElement('option');
                        option.value = province.code;
                        option.textContent = province.name;
                        provinceSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching provinces:', error));
        }
    });

    // Populate cities/municipalities based on selected province
    provinceSelect.addEventListener('change', (e) => {
        const provinceCode = e.target.value;
        citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

        if (provinceCode) {
            fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.code;
                        option.textContent = city.name;
                        citySelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching cities/municipalities:', error));
        }
    });

    // Populate barangays based on selected city/municipality
    citySelect.addEventListener('change', (e) => {
        const cityCode = e.target.value;
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

        if (cityCode) {
            fetch(`https://psgc.cloud/api/provinces/${provinceSelect.value}/barangays`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(barangay => {
                        const option = document.createElement('option');
                        option.value = barangay.code;
                        option.textContent = barangay.name;
                        barangaySelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching barangays:', error));
        }
    });

    // Form validation and submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            messageDiv.textContent = 'Passwords do not match.';
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = 'Registered Successfully.';
            messageDiv.style.color = 'green';
            // Additional form submission logic here (e.g., sending data to a server)
        }
    });
});
