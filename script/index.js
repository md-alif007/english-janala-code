const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}

const loadLessonByLevel = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLessonByLevel(data.data))
}

const displayLessonByLevel = (words) => {
    const levelWordContainer = document.getElementById("level-Word-container");
    // levelWordContainer.innerHTML = "";

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML =
            `
        
        `

        levelWordContainer.append(card);
    });
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =
            `
            <button onclick="loadLessonByLevel(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i 
                    class="fa-solid fa-book">
                </i>
                Lesson - ${lesson.level_no}
            </button>
        `

        levelContainer.append(btnDiv);
    }
}

loadLessons();