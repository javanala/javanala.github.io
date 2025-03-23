
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
  

//   document.addEventListener("DOMContentLoaded", function() {
//     // Fetch the projects data from the JSON file
//     fetch('./projects-seperate.json')
//         .then(response => response.json())
//         .then(data => {
//             // Group 1 projects container
//             const projectsGroup1Container = document.getElementById('projects-cs50w-container');
//             const group1Projects = data.group_1;  // Assuming the JSON is structured
            
//             // Loop through each project in group 1 and create a card
//             group1Projects.forEach(project => {
//                 const projectCard = createProjectCard(project);
//                 projectsGroup1Container.appendChild(projectCard);
//             });

//             // Group 2 projects container
//             const projectsGroup2Container = document.getElementById('projects-personal-container');
//             const group2Projects = data.group_2;  // Assuming the JSON is structured
            
//             // Loop through each project in group 2 and create a card
//             group2Projects.forEach(project => {
//                 const projectCard = createProjectCard(project);
//                 projectsGroup2Container.appendChild(projectCard);
//             });

//             // Group 3 projects container
//             const projectsGroup3Container = document.getElementById('projects-3d-container');
//             const group3Projects = data.group_3;  // Assuming the JSON is structured
            
//             // Loop through each project in group 3 and create a card
//             group3Projects.forEach(project => {
//                 const projectCard = createProjectCard(project);
//                 projectsGroup3Container.appendChild(projectCard);
//             });
//         })
//         .catch(error => console.error('Error loading projects:', error));
// });




document.addEventListener("DOMContentLoaded", function() {
  // Fetch the projects data from the JSON file
  fetch('./projects-seperate.json')
      .then(response => response.json())
      .then(data => {
          // Group 1 projects container
          const projectsGroup1Container = document.getElementById('projects-cs50w-container');
          if (projectsGroup1Container) {  // Check if the container exists
              const group1Projects = data.group_1;  // Assuming the JSON is structured
              group1Projects.forEach(project => {
                  const projectCard = createProjectCard(project);
                  projectsGroup1Container.appendChild(projectCard);
              });
          }

          // Group 2 projects container
          const projectsGroup2Container = document.getElementById('projects-personal-container');
          if (projectsGroup2Container) {  // Check if the container exists
              const group2Projects = data.group_2;  // Assuming the JSON is structured
              group2Projects.forEach(project => {
                  const projectCard = createProjectCard(project);
                  projectsGroup2Container.appendChild(projectCard);
              });
          }

          // Group 3 projects container
          const projectsGroup3Container = document.getElementById('projects-3d-container');
          if (projectsGroup3Container) {  // Check if the container exists
              const group3Projects = data.group_3;  // Assuming the JSON is structured
              group3Projects.forEach(project => {
                  const projectCard = createProjectCard(project);
                  projectsGroup3Container.appendChild(projectCard);
              });
          }
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
              <img class="card-img-top" style="max-height: 20rem" 
                   src="${project.image}" alt="Screenshot of ${project.name} project" />
          </div>
          <hr class="hr-0">
          <div class="project-detail-container">
              <div class="project-text-container">
                  <span class="project-text">${project.name}</span>
              </div>
          </div>

          <div class="overlay">
              <div class="overlay-content">
                  <div class="project-describe">${project.description}</div>
                  
                  <!-- Show special only if it exists -->
                  ${project.special ? `<div class="project-describe-2">Using: ${project.special}</div>` : ''}
                  
                  <div class="layover-items">
                      <!-- Show technologies only if they exist -->
                      ${project.technologies && project.technologies.length > 0 ? `
                          <ul class="project-describe-ul">
                              ${project.technologies.slice(0, 2).map(tech => `<li>${tech}</li>`).join('')}
                          </ul>
                          ${project.technologies.length > 2 ? 
                              `<ul class="project-describe-ul">
                                  ${project.technologies.slice(2).map(tech => `<li>${tech}</li>`).join('')}
                               </ul>` : ''}
                      ` : ''}
                  </div>

                  <div class="project-links">
                      <!-- Show GitHub link only if it exists -->
                      ${project.github ? `
                          <a href="${project.github}" class="project-link link-hover"  aria-label="GitHub" title="Github">
                              <i class="fa-brands fa-github"></i>
                          </a>
                      ` : ''}
                      
                      <!-- Show YouTube link only if it exists -->
                      ${project.youtube ? `
                          <a href="${project.youtube}" class="project-link link-hover"  aria-label="YouTube" title="Video">
                              <i class="fa-brands fa-youtube"></i>
                          </a>
                      ` : ''}
                      

                      <!-- Show Details link only if it exists -->
                      ${project.details ? `
                          <a href="${project.details}" class="project-link link-hover" aria-label="Project Details" title="Website">
                              <i class="fa-regular fa-rectangle-list"></i>
                          </a>
                      ` : ''}

                       <!-- For Group 3, redirect to image-gallery.html with the images list -->
                      ${project.images ? `
                            <a href="image-gallery.html?images=${encodeURIComponent(JSON.stringify(project.images))}" class="project-link link-hover"  aria-label="Image Gallery" >
                                <i class="fa-regular fa-images"></i> View Images
                            </a>
                        ` : ''}
                                    
                  </div>
              </div>
          </div>
      </div>
  `;

  return projectCard;
}
