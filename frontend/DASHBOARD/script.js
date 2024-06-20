document.addEventListener('DOMContentLoaded', () => {
    const userId = 123; // Replace with actual user ID

    // Fetch schedules for the user
    fetch(`/api/schedules/${userId}`)
        .then(response => response.json())
        .then(schedules => {
            const scheduleList = document.getElementById('schedule-list');
            schedules.forEach(schedule => {
                const item = document.createElement('div');
                item.classList.add('schedule-item');
                item.innerHTML = `
                    <p>${schedule.schedule_date} - ${schedule.collection_type}</p>
                    <button data-schedule-id="${schedule.id}" data-notification="${schedule.enable_notification ? 'enabled' : 'disabled'}">
                        ${schedule.enable_notification ? 'Disable Notification' : 'Enable Notification'}
                    </button>
                `;
                scheduleList.appendChild(item);

                // Add event listener to button for updating notification preference
                const button = item.querySelector('button');
                button.addEventListener('click', () => {
                    const scheduleId = button.getAttribute('data-schedule-id');
                    const enableNotification = !schedule.enable_notification;

                    // Send POST request to update notification preference
                    fetch('/api/schedule/notification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ scheduleId, enableNotification })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        button.textContent = enableNotification ? 'Disable Notification' : 'Enable Notification';
                        button.setAttribute('data-notification', enableNotification ? 'enabled' : 'disabled');
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
