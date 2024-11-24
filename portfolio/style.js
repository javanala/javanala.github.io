
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      window.scrollTo({
        top: target.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    });
  });

  // Delete project handling
  document.querySelectorAll(".delete-project-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const projectCard = this.closest(".projects-card");

      if (!confirm("Are you sure you want to delete this project?")) {
        return;
      }

      fetch(this.action, {
        method: "POST",
        headers: {
          "X-CSRFToken": "{{ csrf_token }}",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            projectCard.remove();
          } else {
            alert("Failed to delete the project.");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });

  // Delete skill handling
  document.querySelectorAll(".delete-skill-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const skillCard = this.closest(".skills-card");

      if (!confirm("Are you sure you want to delete this skill?")) {
        return;
      }

      fetch(this.action, {
        method: "POST",
        headers: {
          "X-CSRFToken": "{{ csrf_token }}",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            skillCard.remove();
          } else {
            alert("Failed to delete the skill.");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });

  // Delete link handling
  document.querySelectorAll(".delete-contact-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const contactCard = this.closest(".contacts-card");

      if (!confirm("Are you sure you want to delete this contact link?")) {
        return;
      }

      const scrollPosition = window.scrollY; // Store the current scroll position

      fetch(this.action, {
        method: "POST",
        headers: {
          "X-CSRFToken": "{{ csrf_token }}",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            contactCard.remove();
            window.scrollTo(0, scrollPosition); // Restore the scroll position
          } else {
            alert("Failed to delete the contact link.");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });


document.addEventListener("DOMContentLoaded", function() {
    // Fetch the projects data from the JSON file
    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            
            // Loop through each project in the data
            data.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});

// Function to create a project card
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('projects-card');

    projectCard.innerHTML = `
        <div class="project-container">
            <div class="project-image">
                <img class="card-img-top" style="max-height: 20rem" src="${project.image}" alt="Screenshot of ${project.name} project" />
            </div>
            <div class="project-detail-container">
                <div class="project-text-container">
                    <span class="project-text">${project.name}</span>
                </div>
            </div>

            <div class="overlay">
                <div class="overlay-content">
                    <div class="project-describe">${project.description}</div>
                    <div class="project-describe-2">Using: ${project.special}</div>
                    <div class="layover-items">
                        <ul class="project-describe-ul">
                            ${project.technologies.slice(0, 2).map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                        <ul class="project-describe-ul">
                            ${project.technologies.slice(2).map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link link-hover">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${project.youtube}" class="project-link link-hover">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                        <a href="${project.details}" class="project-link link-hover">
                            <i class="fa-regular fa-rectangle-list"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    return projectCard;
}
