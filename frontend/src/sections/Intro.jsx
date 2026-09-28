import ExternalLink from "../components/ExternalLink";
import ContributionGraph from "../components/ContributionGraph";
import { LinkedInIcon, MailIcon } from "../components/Icons";
import { profile, socials } from "../data/profile";

function Intro() {
  return (
    <section
      id="home"
      className="intro"
      aria-labelledby="home-heading"
      tabIndex={-1}
    >
      <div className="intro__identity">
        <img
          className="intro__avatar"
          src={profile.avatar}
          alt=""
          width="56"
          height="56"
          fetchPriority="high"
        />
        <div>
          <h1 id="home-heading" className="intro__name">
            {profile.name}
          </h1>
          <p className="intro__role">{profile.role}</p>
        </div>
      </div>

      <div className="intro__bio">
        <p>
          I design interfaces in <strong>Figma</strong> and build them in{" "}
          <strong>React</strong>. Most of my work is responsive layouts and
          component-based UI.
        </p>
        <p>
          I'm studying Computer Science at Malla Reddy College of Engineering,
          Hyderabad. I also <span className="nowrap">co-founded</span>{" "}
          <strong>Vistaar</strong>, where I work on the frontend.
        </p>
      </div>

      <div className="intro__card">
        <ContributionGraph user={profile.githubUser} profileUrl={socials.github.href} />

        <p className="intro__cta">
          Want to work together?{" "}
          <ExternalLink href={profile.resume}>
            Resume<span className="visually-hidden"> (PDF)</span>
          </ExternalLink>
        </p>

        <div className="intro__actions">
          <a className="button" href={`mailto:${profile.email}`}>
            <MailIcon />
            Email me
          </a>
          <a
            className="button"
            href={socials.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            LinkedIn
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Intro;
