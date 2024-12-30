document.getElementById('exercise-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const exerciseName = document.getElementById('exercise-name').value;
    const exerciseDate = document.getElementById('exercise-date').value;
    const exerciseDuration = document.getElementById('exercise-duration').value;

    // Veriyi sunucuya gönder
    await fetch('http://localhost:3000/add-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            egzersiz_adi: exerciseName,
            tarih: exerciseDate,
            sure: exerciseDuration,
        }),
    });

    // Formu sıfırla ve listeyi güncelle
    event.target.reset();
    loadExercises();
});

async function loadExercises() {
    const response = await fetch('http://localhost:3000/get-exercises');
    const exercises = await response.json();

    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';
    exercises.forEach((exercise) => {
        const listItem = document.createElement('li');

        // Tarihi sadece tarih kısmı olarak al
        const exerciseDate = new Date(exercise.tarih);
        const formattedDate = exerciseDate.toLocaleDateString(); // Bu, tarihi sadece gün/ay/yıl formatında verir

        listItem.textContent = `${exercise.egzersiz_adi} - ${formattedDate} - ${exercise.sure} dakika`;
        exerciseList.appendChild(listItem);
    });
}

// Sayfa yüklendiğinde listeyi yükle
document.addEventListener('DOMContentLoaded', loadExercises);
