const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
var typed = new Typed(".text",{
    strings:["Software Engineer", "Software Engineer"],
    typeSpeed : 10,
    backSpeed : 100,
    backDelay : 1000,
    loop : true
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

const canvas = document.getElementById('connect-three');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 70;
const maxDistance = 80;
let userPoint = null;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.radius = 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#808080';
        ctx.fill();
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const distance = Math.sqrt(
                (particles[i].x - particles[j].x) ** 2 +
                (particles[i].y - particles[j].y) ** 2
            );

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(128,128, 128, ${1 - distance / maxDistance})`;
                ctx.stroke();
            }
        }
    }
}

function connectUserPoint() {
    if (!userPoint) return;

    particles.forEach(particle => {
        const distance = Math.sqrt(
            (particle.x - userPoint.x) ** 2 +
            (particle.y - userPoint.y) ** 2
        );

        if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(userPoint.x, userPoint.y);
            ctx.strokeStyle = `rgba(128,128,128, ${20 - distance / maxDistance})`;
            ctx.stroke();
        }
    });
}

function drawText() 
{
    ctx.fillStyle = 'black';
    if (window.innerWidth < 405) { // Adjust for very small devices
        ctx.font = '11px Times New Roman';
        ctx.fillText("Welcome to my portfolio! 🌟", width / 3 - 15, height / 2.7);
        ctx.fillText("Aspiring Software Engineer on a journey of learning and growth 📈.", width / 16 - 15, height / 2.4);
        ctx.fillText("Explore my projects and journey as I strive towards making a positive ", width / 16 - 15, height / 2.2);
        ctx.fillText("impact through technology.", width / 3 - 15, height / 2.1);
        ctx.fillText("Let's connect and explore the possibilities together! 🚀", width / 8, height / 1.9);
    } else if (window.innerWidth < 768) { // Adjust for mobile devices
        ctx.font = '14px Times New Roman';
        ctx.fillText("Welcome to my portfolio! 🌟 Aspiring Software Engineer on a journey of learning and growth 📈.", width / 15 - 15, height / 2.2);
        ctx.fillText("Explore my projects and journey as I strive towards making a positive impact through technology.", width / 16 - 15, height / 2);
        ctx.fillText("Let's connect and explore the possibilities together! 🚀", width / 4, height / 1.8);
    } else { // Adjust for desktop devices
        ctx.font = '28px Times New Roman';
        ctx.fillText("Welcome to my portfolio! 🌟 Aspiring Software Engineer on a journey of learning and growth 📈.", width / 6.5 - 60, height / 2.2);
        ctx.fillText("Explore my projects and journey as I strive towards making a positive impact through technology.", width / 6.6 - 70, height / 1.9);
        ctx.fillText("Let's connect and explore the possibilities together! 🚀", width / 3.2 - 70, height / 1.68);
    } 
}    

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    window.addEventListener('resize', drawText);
    connectParticles();
    connectUserPoint();
    drawText();
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (event) => {
    userPoint = {
        x: event.clientX,
        y: event.clientY
    };
});

canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    userPoint = {
        x: touch.clientX,
        y: touch.clientY
    };
});

canvas.addEventListener('mouseleave', () => {
    userPoint = null;
});

canvas.addEventListener('touchend', () => {
    userPoint = null;
});

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

animate();


/*function sendMail(){
(function() {
    emailjs.init('hdycfTpIOaATx1sAj'); 
})();

var templateParams = {
    sendername: document.querySelector("#sendername").value,
    to: document.querySelector("#to").value,
    subject: document.querySelector("#subject").value,
    replyto: document.querySelector("#replyto").value,
    message: document.querySelector("#message").value,
}
var serviceID = "service_16ua4zm";
var templateID = "template_yxon8hd";

emailjs.send(serviceID,templateID,templateParams)
.then( res => {
    alert("Email Send Succesfully!")

})
.catch();

}
*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });

    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

