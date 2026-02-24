const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class= "btn">${el}</span>`)
    return (htmlElements.join(" "));
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => btn.classList.remove("active"));
}

const loadLessonByLevel = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add("active");
            displayLessonByLevel(data.data);
        })
}

const loadWordDetail = async (id) => {
    const detailUrl = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(detailUrl);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML =
        `            
            <div>
                    <h2 class="text-2xl font-bold">
                        ${word.word} (<i class="fa-solid fa-microscope"></i>:${word.pronunciation})
                    </h2>
                    <div class="space-y-3">
                        <div>
                            <h2 class="font-bold">
                                Meaning
                            </h2>
                            <p>${word.meaning}</p>
                        </div>
                        <div>
                            <h2 class="font-bold">
                                Example
                            </h2>
                            <p>${word.sentence}</p>
                        </div>
                        <div>
                            <h2 class="font-bold font-bangla">
                                সমার্থক শব্দ গুলো
                            </h2>
                            <div>${createElements(word.synonyms)}</div>
                        </div>

                    </div>
                </div>
            
        `
    document.getElementById("my_modal_5").showModal();
}

const displayLessonByLevel = (words) => {
    const levelWordContainer = document.getElementById("level-Word-container");
    levelWordContainer.innerHTML = "";

    if (words.length == 0) {
        levelWordContainer.innerHTML =
            `
                <div class="col-span-full ">
                    <p class="font-bangla text-center ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি</p>
                    <h2 class="font-bangla font-semibold text-4xl text-center mt-3">নেক্সট Lesson এ যান</h2>
                </div>
            `
        return;
    }

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");

        // {
        //     "id": 5,
        //         "level": 1,
        //             "word": "Eager",
        //                 "meaning": "আগ্রহী",
        //                     "pronunciation": "ইগার"
        // }


        card.innerHTML =
            `
            <div class="bg-white rounded-xl shadow-sm text-center py-5 px-5 space-y-3">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                <p class="font-semibold text-xl">Meaning /Pronounciation</p>
                <div class="font-bangla font-bold text-2xl">
                    "${word.meaning ? word.meaning : "পাওয়া যায় নি"} / 
                    ${word.pronunciation ? word.pronunciation : "পাওয়া যায় নি"}"
                </div>
                <div class="flex justify-between items-center">
                    <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF20]"><i class="fa-brands fa-itunes-note"></i></button>
                </div>
            </div>
        
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
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLessonByLevel(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
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