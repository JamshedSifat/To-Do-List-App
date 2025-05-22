// ইনপুট বক্স (যেখানে ইউজার টাস্ক লিখবে) DOM থেকে আইডি দিয়ে খুঁজে আনা হচ্ছে
const inputBox = document.getElementById("input-box");

// যেখানে টাস্কের তালিকা দেখানো হবে, সেই UL বা DIV আইডি দিয়ে খুঁজে আনা হচ্ছে
const listContainer = document.getElementById("list-container");

// টাস্ক যোগ করার জন্য ফাংশন
function addTask() {
    // যদি ইনপুট ফাঁকা থাকে, তাহলে সতর্কবার্তা দেখানো হবে
    if(inputBox.value === ''){
        alert("you must write something");
    }
    else { 
        // নতুন একটি <li> এলিমেন্ট তৈরি করা হচ্ছে
        let li = document.createElement("li");

        // <li> এর ভিতরে ইনপুট বক্সে যা লেখা ছিল, তা বসানো হচ্ছে
        li.innerHTML = inputBox.value;

        // listContainer এর ভিতরে নতুন তৈরি করা li যোগ করা হচ্ছে
        listContainer.appendChild(li);

        // একটি <span> তৈরি করা হচ্ছে যেটা × চিহ্ন হিসেবে কাজ করবে (ডিলিট বোতাম)
        let span = document.createElement("span");

        // span এর ভিতরে Unicode × (গুন চিহ্ন) বসানো হচ্ছে
        span.innerHTML = "\u00d7";

        // li এর ভিতরে span (× বোতাম) যোগ করা হচ্ছে
        li.appendChild(span);
    }

    // ইনপুট বক্স খালি করে দেওয়া হচ্ছে যাতে নতুন টাস্ক লেখা যায়
    inputBox.value = "";

    // লিস্টের বর্তমান অবস্থা লোকালস্টোরেজে সংরক্ষণ করা হচ্ছে
    saveData();
}

// listContainer এর মধ্যে ক্লিক হলে কী হবে, সেটা হ্যান্ডেল করা হচ্ছে
listContainer.addEventListener("click", function(e){
    // যদি LI-তে ক্লিক হয়, তাহলে সেটি চেক/আনচেক করা হবে (স্টাইলিংয়ের জন্য)
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");  // CSS ক্লাস টগল করে
        saveData(); // পরিবর্তনের পর লোকালস্টোরেজে সংরক্ষণ
    }

    // যদি × বোতামে (span) ক্লিক হয়, তাহলে পুরো li রিমুভ করা হবে
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); // span এর parent li রিমুভ
        saveData(); // পরিবর্তনের পর লোকালস্টোরেজ আপডেট
    }
}, false);

// লোকালস্টোরেজে listContainer এর HTML সংরক্ষণ করে
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// লোকালস্টোরেজ থেকে পূর্বের তালিকা দেখানোর ফাংশন
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// যখন পেজ লোড হবে, তখন পূর্বের টাস্ক লোড করে দেখাবে
showTask();
