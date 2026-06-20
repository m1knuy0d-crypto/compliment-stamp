import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDIhMEttVsUnyszD85vixcxA5oxb5hsF18",
    authDomain: "compliment-stamp.firebaseapp.com",
    projectId: "compliment-stamp",
    storageBucket: "compliment-stamp.firebasestorage.app",
    messagingSenderId: "684362950010",
    appId: "1:684362950010:web:d7f057ef5a887a0cdd22c3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const etcBox = document.getElementById("etc");

document
    .querySelectorAll('input[name="reason"]')
    .forEach(box => {
        box.addEventListener("change", () => {

            const etcChecked =
                document.querySelector(
                    'input[value="기타"]'
                ).checked;

            etcBox.style.display =
                etcChecked ? "block" : "none";
        });
    });

document
    .getElementById("submitBtn")
    .addEventListener("click", submitStamp);

async function submitStamp() {


    const name =
        document.getElementById("name")
        .value.trim();

    const org =
        document.getElementById("org")
        .value.trim();

    const checkedReasons =
        document.querySelectorAll(
            'input[name="reason"]:checked'
        );

    const reasons = [];

    checkedReasons.forEach(item => {
        reasons.push(item.value);
    });

    const etc =
        document.getElementById("etc")
        .value.trim();

    if (!name || !org || reasons.length === 0) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    try {


        await addDoc(
            collection(db, "stamps"),
            {
                name: name,
                org: org,
                reasons: reasons,
                etc: etc,
                createdAt: new Date()
            }
        );



        document.querySelector(
            ".container"
        ).innerHTML = `
            <h1>🎉 감사합니다!</h1>

            <p style="text-align:center; font-size:18px;">
                칭찬도장이 정상적으로 전달되었습니다.
            </p>

            <button id="copyBtn">
                링크 복사하기
            </button>
        `;

        document
            .getElementById("copyBtn")
            .addEventListener(
                "click",
                copyLink
            );

    } catch (error) {
        console.error(error);
        alert("저장 중 오류가 발생했습니다.");
    }
}

function copyLink() {

    navigator.clipboard.writeText(
        window.location.href
    );

    alert("링크가 복사되었습니다.");
}