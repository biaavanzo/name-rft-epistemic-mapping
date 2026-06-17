import { useState } from "react";

const C = {
  cream: "#F5F0E8", gold: "#B8960C", goldLight: "#E8D5A3",
  dark: "#2C2C2C", mid: "#5A5A5A", muted: "#888888",
  border: "#DDD5C8", white: "#FFFFFF", nodeBg: "#FDFAF5",
  red: "#C0392B", orange: "#E67E22", purple: "#8E44AD",
  green: "#27AE60", blue: "#2980B9", teal: "#16A085",
};

const SIGNAL_COLORS = {
  "Kₑ breaks": "#C0392B", "F increases": "#E67E22",
  "σ(M) high": "#8E44AD", "Nominal reversal": "#B8960C",
  "Coherent": "#27AE60", "Crux": "#2980B9", "Gap": "#16A085",
};

const RUBRIC = {
  phi: [
    { range: "0.0–0.2", label: "Severely degraded", desc: "Claim untraceable to primary source; multiple relay steps; original data inaccessible" },
    { range: "0.2–0.4", label: "Weak", desc: "Primary source exists but not directly cited; significant relay distortion likely" },
    { range: "0.4–0.6", label: "Moderate", desc: "Source cited; some relay distortion; partial primary access" },
    { range: "0.6–0.8", label: "Strong", desc: "Direct citation; primary data accessible; minimal relay" },
    { range: "0.8–1.0", label: "High fidelity", desc: "Primary source, raw data accessible, independently replicable" },
  ],
  ke: [
    { range: "0.0–0.2", label: "Mechanism absent", desc: "Claim asserted institutionally before any mechanism established; or undisclosed conflict of interest" },
    { range: "0.2–0.4", label: "Mechanism assumed", desc: "Plausible mechanism proposed but not tested; or tested only by interested parties" },
    { range: "0.4–0.6", label: "Mechanism partial", desc: "Mechanism tested but in limited populations; replication incomplete" },
    { range: "0.6–0.8", label: "Mechanism supported", desc: "Multiple independent replications; holds across populations with known exceptions" },
    { range: "0.8–1.0", label: "Mechanism verified", desc: "Robust independent replication; mechanistic pathway established; exceptions characterized" },
  ],
  f: [
    { range: "0.0–0.2", label: "Minimal", desc: "High consistency across sources; individual variation preserved; no structural contradictions" },
    { range: "0.2–0.4", label: "Low", desc: "Minor inconsistencies; some variation averaging; resolvable contradictions" },
    { range: "0.4–0.6", label: "Moderate", desc: "Significant contradictions; individual variation partially erased; competing interpretations active" },
    { range: "0.6–0.8", label: "High", desc: "Structural contradictions; systematic variation erasure; investigative apparatus compromised" },
    { range: "0.8–1.0", label: "Severe", desc: "Knowledge base incoherent; investigator shares provenance with claim; independent verification blocked" },
  ],
  sigma: [
    { range: "0.0–0.2", label: "Stable", desc: "Variance compressed; consensus traveled into behavior and adjacent fields; attractor stable" },
    { range: "0.2–0.4", label: "Settling", desc: "Variance reducing; some behavioral lag; consensus propagating" },
    { range: "0.4–0.6", label: "Uncertain", desc: "Mixed signals; nominal consensus with significant behavioral non-compliance" },
    { range: "0.6–0.8", label: "Volatile", desc: "Nominal reversal not traveled; two competing attractors; behavior anchored to superseded claim" },
    { range: "0.8–1.0", label: "Bimodal", desc: "Two stable attractors simultaneously active; structural prevention of convergence; primary data inaccessible" },
  ],
};

const SEED_NODES = [
  {
    id: 1, case: "Eggs & Cholesterol", year: "1952–61", nodeType: "claim",
    who: "Ancel Keys / American Heart Association",
    claim: "Dietary fat raises serum cholesterol, causing heart disease. No more than 3 egg yolks per week.",
    source: "Seven Countries Study; AHA Dietary Guidelines 1968",
    signal: "Kₑ breaks",
    signalNote: "Mechanism unverified at adoption. Keys' own data contradicted the population claim. Countries with disconfirming data excluded from Seven Countries Study.",
    phi: 0.4, ke: 0.2, f: 0.8, sigma: 0.7,
    phiJustification: "Source exists but Seven Countries dataset was selectively constructed; excluded disconfirming countries",
    keJustification: "AHA adopted claim before mechanistic pathway from dietary cholesterol to cardiovascular events was established",
    fJustification: "Individual genetic variation in cholesterol metabolism completely absent from population-level claim",
    sigmaJustification: "Claim remained behaviorally active for 50+ years despite later contradictions",
    competingInterpretations: [
      { prior: "Standard public health", reading: "Keys' hypothesis was reasonable given available evidence in 1961. Population-level dietary guidelines necessarily average individual variation. The AHA acted appropriately on best available science.", sigDifference: "Kₑ rises to ~0.5 if you weight 'reasonable given era' rather than 'mechanistically verified'" },
      { prior: "Industry-critical", reading: "The Seven Countries Study exclusions were deliberate selection to support a predetermined conclusion. Institutional capture of nutritional science began here.", sigDifference: "F rises to ~0.95; Φ drops to ~0.2" },
    ],
    crux: "Would a pre-registered replication of the Seven Countries Study including all available countries show the same diet-heart correlation?",
    cruxType: "Dataset access",
    missingEvidence: "Full original dataset from all countries Keys studied, including excluded nations. Independent reconstruction of data selection process.",
    dependencies: [], correlatedWith: [], adversarialFlag: null,
  },
  {
    id: 2, case: "Eggs & Cholesterol", year: "1970s–85", nodeType: "claim",
    who: "Brown & Goldstein (Nobel Prize 1985)",
    claim: "Cholesterol metabolism is genetically regulated. The body compensates for dietary intake endogenously. Individual variation is fundamental.",
    source: "Brown & Goldstein (1986). Science, 232(4746), 34–47.",
    signal: "F increases",
    signalNote: "Mechanism directly contradicts population assumption. Individual variation is not noise — it is the primary phenomenon. Guidelines did not update despite Nobel-level mechanistic evidence.",
    phi: 0.85, ke: 0.9, f: 0.5, sigma: 0.6,
    phiJustification: "Nobel Prize-winning primary research; directly accessible; replicated across multiple labs",
    keJustification: "Mechanism rigorously established through genetic studies of familial hypercholesterolemia",
    fJustification: "Contradiction with Node 1 is explicit and unresolved at the guideline level",
    sigmaJustification: "Scientific consensus formed but did not compress into dietary guideline behavior until 2015",
    competingInterpretations: [
      { prior: "Population health", reading: "Brown & Goldstein established LDL receptor biology, not dietary cholesterol response per se. Translation to population dietary guidance requires additional steps that remain contested.", sigDifference: "Kₑ drops to ~0.6 for the specific claim about dietary eggs" },
      { prior: "Mechanistic", reading: "The endogenous compensation mechanism means dietary cholesterol guidelines were always physiologically incoherent for the majority of the population.", sigDifference: "F rises to 0.8; strengthens the fragmentation signal" },
    ],
    crux: "What percentage of the population are 'hyper-responders' to dietary cholesterol? If >30%, population guidelines remain defensible. If <15%, individual variation is the dominant signal.",
    cruxType: "Empirical estimate",
    missingEvidence: "Large-scale RCT with genetic stratification separating hyper-responders from normal-responders before measuring dietary cholesterol effects.",
    dependencies: [], correlatedWith: [], adversarialFlag: null,
  },
  {
    id: 3, case: "Eggs & Cholesterol", year: "2015", nodeType: "reversal",
    who: "US Dietary Guidelines Advisory Committee",
    claim: "Dietary cholesterol removed from list of nutrients of public health concern. 300mg/day limit dropped.",
    source: "DGAC Scientific Report 2015; Shin et al. (2013) meta-analysis, 16 studies, ~350,000 participants.",
    signal: "Nominal reversal",
    signalNote: "Institutional reversal occurred but was hedged. Language still advised minimizing dietary cholesterol. Reversal did not travel into public communication or behavior.",
    phi: 0.7, ke: 0.7, f: 0.45, sigma: 0.6,
    phiJustification: "Government report directly accessible; meta-analysis independently published",
    keJustification: "Meta-analytic evidence reasonably strong; but confounders not fully resolved",
    fJustification: "Significant reduction in fragmentation at scientific level; residual fragmentation in public communication",
    sigmaJustification: "Variance began compressing but behavioral lag persists significantly",
    competingInterpretations: [
      { prior: "Conservative cardiology", reading: "The 2015 reversal was premature. Observational meta-analyses cannot establish causality. RCT evidence for dietary cholesterol safety remains sparse.", sigDifference: "Kₑ drops to ~0.4; F stays high; nominal reversal challenged" },
      { prior: "Nutritional epidemiology", reading: "The reversal was overdue and warranted. The hedged language reflected political compromise, not scientific uncertainty.", sigDifference: "σ(M) drops to ~0.3 — reversal was real and well-supported" },
    ],
    crux: "Do controlled feeding RCTs (not observational) show cardiovascular risk increase from egg consumption in normolipidemic individuals?",
    cruxType: "RCT gap",
    missingEvidence: "Adequately powered RCT of egg consumption with hard cardiovascular endpoints in non-hypercholesterolemic adults.",
    dependencies: [1], correlatedWith: [], adversarialFlag: null,
  },
  {
    id: 4, case: "Eggs & Cholesterol", year: "2025", nodeType: "assessment",
    who: "Rancho Bernardo Study (Kritz-Silverstein et al.)",
    claim: "Despite 2015 reversal, >20% of people still limit egg intake due to outdated cholesterol concerns.",
    source: "48-year longitudinal cohort. Journal of the American College of Nutrition, 2025.",
    signal: "σ(M) high",
    signalNote: "Behavioral attractor still anchored to 1968 claim. σ(M) elevated — knowledge did not travel into public behavior despite nominal institutional reversal.",
    phi: 0.7, ke: 0.6, f: 0.35, sigma: 0.75,
    phiJustification: "Well-documented longitudinal study; but survivor bias noted by authors",
    keJustification: "Behavioral finding is solid; causal mechanism linking guideline change to behavior change is less established",
    fJustification: "Low fragmentation at this node — finding is consistent and clear",
    sigmaJustification: "σ(M) remains elevated; behavioral non-compliance with updated consensus is the direct measurement",
    competingInterpretations: [
      { prior: "Public health realist", reading: "20% behavioral lag after a major dietary guideline reversal is actually fast. Dietary behavior changes on decadal timescales. This is normal diffusion, not a failure.", sigDifference: "σ(M) drops to ~0.4 — expected lag, not elevated instability" },
      { prior: "Health communication", reading: "The lag reflects contradictory messaging. If guidelines hedged the reversal, public caution is rational.", sigDifference: "F score for Node 3 rises; the hedged reversal itself caused σ(M) elevation" },
    ],
    crux: "Is the 20% behavioral non-compliance driven by: (a) slow diffusion, (b) rational response to hedged messaging, or (c) media persistence of old claim? Each has different intervention implications.",
    cruxType: "Mechanism of behavioral lag",
    missingEvidence: "Survey data distinguishing sources of continued egg avoidance: physician advice, media, personal memory of old guidelines, or active concern.",
    dependencies: [1, 3], correlatedWith: [3],
    adversarialFlag: "SURVIVOR BIAS: Rancho Bernardo 2021 respondents skew older, higher education, lower diabetes — not representative of full population behavioral distribution.",
  },
  {
    id: 5, case: "COVID-19 Origins", year: "Feb 2020", nodeType: "claim",
    who: "Peter Daszak + 26 co-signatories (EcoHealth Alliance)",
    claim: "Strongly condemns 'conspiracy theories suggesting that COVID-19 does not have a natural origin.' Scientists 'overwhelmingly conclude' wildlife origin.",
    source: "Calisher et al. (2020). The Lancet, 395(10226), e42–e43.",
    signal: "Kₑ breaks",
    signalNote: "Undisclosed conflict of interest: Daszak organized letter while omitting EcoHealth's WIV partnership. Claim asserted as settled before mechanism established.",
    phi: 0.6, ke: 0.1, f: 0.9, sigma: 0.85,
    phiJustification: "Letter is directly accessible; but provenance of the consensus claim is compromised by undisclosed COI",
    keJustification: "Natural origin was not mechanistically established at time of publication; claim preceded evidence",
    fJustification: "Structural fragmentation: claim-maker had direct financial stake in the conclusion",
    sigmaJustification: "This node anchored public discourse for 12+ months; instability persists through 2026",
    competingInterpretations: [
      { prior: "Zoonosis-committed virologist", reading: "The letter was scientifically warranted given strong prior probability of zoonotic spillover for bat coronaviruses. COI disclosure failures are procedural, not epistemic.", sigDifference: "Kₑ rises to ~0.5; the claim had legitimate scientific basis even if COI was undisclosed" },
      { prior: "Lab leak researcher", reading: "The letter was a coordinated suppression operation by financially interested parties. The timing — within weeks of the outbreak, before any evidence — makes it impossible to interpret as genuine consensus.", sigDifference: "Kₑ stays at 0.1 or lower; Φ drops to 0.2" },
    ],
    crux: "Did the signatories have access to virological evidence at time of publication that legitimately supported zoonotic origin? If yes, Kₑ rises. If no, the claim was solely prior-based and institutionally motivated.",
    cruxType: "Evidence availability at time of claim",
    missingEvidence: "Internal communications of signatories in January–February 2020. Full FOIA release of NIH/EcoHealth grant documentation.",
    dependencies: [], correlatedWith: [6, 7], adversarialFlag: null,
  },
  {
    id: 6, case: "COVID-19 Origins", year: "2020–21", nodeType: "structure",
    who: "WHO / Lancet COVID Commission",
    claim: "Daszak appointed to lead both the Lancet COVID Commission origins task force and WHO's 10-person origins investigation — despite organizing the original Lancet letter.",
    source: "WHO SAGO composition (2020); Lancet Commission on COVID-19 (2020).",
    signal: "F increases",
    signalNote: "Investigative apparatus shares provenance with original claim. The correction mechanism cannot function when controlled by the original claim-maker.",
    phi: 0.75, ke: 0.1, f: 0.95, sigma: 0.9,
    phiJustification: "Appointment records directly verifiable",
    keJustification: "No epistemic alignment possible when investigator has direct financial stake in outcome",
    fJustification: "Maximum structural fragmentation: independent verification systematically excluded by design",
    sigmaJustification: "This structural failure propagated instability through all subsequent nodes",
    competingInterpretations: [
      { prior: "Institutional efficiency", reading: "Daszak was the world's leading expert on bat coronavirus spillover. Appointing domain experts to investigation panels is standard practice.", sigDifference: "F drops to ~0.5; COI is real but expertise rationale is legitimate" },
      { prior: "Governance reform", reading: "Expertise and independence are both necessary; when they conflict, structural independence must take priority for credibility.", sigDifference: "F stays at 0.95; the structural problem is the finding regardless of intent" },
    ],
    crux: "Were alternative qualified investigators with no financial ties to EcoHealth/WIV considered and rejected? Documentation of appointment process would resolve whether COI was acknowledged and overridden or invisible.",
    cruxType: "Process documentation",
    missingEvidence: "WHO appointment process documentation. Lancet Commission chair correspondence regarding Daszak appointment.",
    dependencies: [5], correlatedWith: [5, 7],
    adversarialFlag: "CORRELATED EVIDENCE: Nodes 5, 6, and 7 share the same source cluster (Lancet letter, FOIA emails, Sachs statements). Their M scores are not independent — treat as a single evidence chain, not three confirming nodes.",
  },
  {
    id: 7, case: "COVID-19 Origins", year: "2021–22", nodeType: "reversal",
    who: "Jeffrey Sachs, Lancet Commission Chair",
    claim: "Disbanded origins task force. Publicly stated he was 'pretty convinced it came out of US lab biotechnology — not out of nature' after two years of intensive work.",
    source: "Sachs public statements (2022); Lancet Commission final report (2022).",
    signal: "Nominal reversal",
    signalNote: "Chair of originating institution reversed without retracting original letter or producing new primary evidence. Contradiction logged; σ(M) unaffected.",
    phi: 0.6, ke: 0.5, f: 0.6, sigma: 0.85,
    phiJustification: "Sachs statements are directly quotable; but represent opinion, not new primary evidence",
    keJustification: "Reversal is based on process observation (structural COI) not new virological mechanism",
    fJustification: "Reversal without retraction creates two simultaneous official positions from same institution",
    sigmaJustification: "Reversal did not compress variance; if anything increased bimodal instability",
    competingInterpretations: [
      { prior: "Zoonosis", reading: "Sachs' reversal reflects political frustration with lack of Chinese cooperation, not new scientific evidence. A frustrated commission chair is not virological evidence.", sigDifference: "Kₑ drops to 0.2; this node loses epistemic weight substantially" },
      { prior: "Lab leak", reading: "Sachs is the most credible possible source — the chair of the investigation designed to find zoonosis. His conclusion after two years carries enormous weight.", sigDifference: "Kₑ rises to 0.7; insider reversal is strong epistemic signal" },
    ],
    crux: "What specific evidence or observations caused Sachs to reverse? If based on new data access, Kₑ rises significantly. If based solely on COI observation, Kₑ stays low.",
    cruxType: "Basis of reversal",
    missingEvidence: "Sachs' detailed account of what evidence he reviewed. Commission internal deliberation records.",
    dependencies: [5, 6], correlatedWith: [5, 6], adversarialFlag: null,
  },
  {
    id: 8, case: "COVID-19 Origins", year: "2023–26", nodeType: "assessment",
    who: "FBI, DOE, Senate Intelligence Committee; peer-reviewed zoonosis studies",
    claim: "Multiple US intelligence agencies assess lab leak as most likely origin (low–moderate confidence). Three major 2025 peer-reviewed studies support zoonotic spillover.",
    source: "ODNI Unclassified Summary (2023); Pekar et al., Cell (2025); WHO SAGO Report (2025).",
    signal: "σ(M) high",
    signalNote: "Knowledge base is genuinely bimodal. Two well-supported attractors simultaneously active. σ(M) maximally elevated — not from weak science but from structural prevention of investigation.",
    phi: 0.5, ke: 0.45, f: 0.8, sigma: 0.95,
    phiJustification: "Intelligence assessments partially classified; peer-reviewed studies accessible but rely on incomplete genomic data",
    keJustification: "Both hypotheses have partial mechanistic support; neither has access to primary data needed for resolution",
    fJustification: "Genuine bimodal fragmentation — not resolvable with current accessible evidence",
    sigmaJustification: "Maximum instability: two stable attractors, no convergence mechanism, primary data inaccessible",
    competingInterpretations: [
      { prior: "Zoonosis", reading: "Three major 2025 peer-reviewed studies converge on zoonotic origin. Intelligence assessments with 'low confidence' do not constitute scientific evidence. The bimodal appearance reflects political, not epistemic, division.", sigDifference: "σ(M) drops to ~0.4 if you weight peer-reviewed science over intelligence assessments" },
      { prior: "Lab leak", reading: "Peer-reviewed studies depend on data consistent with Chinese institutional cooperation. Independence of evidence base is structurally compromised. Intelligence agencies with classified access give lab leak higher probability.", sigDifference: "Φ drops to 0.2 for zoonosis studies; F rises to 0.9" },
    ],
    crux: "Primary sequence data from early Wuhan cases, raw market samples, and WIV databases — currently inaccessible. Release of this data would be the highest-leverage single event for resolving the bimodal attractor.",
    cruxType: "Primary data access",
    missingEvidence: "WIV viral database (taken offline September 2019). Raw environmental samples from Huanan market with chain of custody. Full genomic sequences from earliest known cases.",
    dependencies: [5, 6, 7], correlatedWith: [5, 6, 7],
    adversarialFlag: "INCOMMENSURABLE EVIDENCE TYPES: This node aggregates classified intelligence assessments and peer-reviewed genomics as if commensurable. They use different methodologies and have different access to primary data — they cannot be directly compared on a single scale.",
  },
  {
    id: 9, case: "LHC Black Hole Safety", year: "1999–2003", nodeType: "claim",
    who: "Walter Wagner; Luis Sancho; independent critics",
    claim: "High-energy particle collisions at CERN's LHC could produce stable microscopic black holes or strangelets that might accrete matter and destroy the Earth.",
    source: "Wagner, W. L., & Sancho, L. (2008). Federal lawsuit filing against CERN. U.S. District Court, Hawaii.",
    signal: "Kₑ breaks",
    signalNote: "The concern was not mechanistically incoherent — it followed from speculative theoretical extensions about extra dimensions and TeV-scale gravity. But the specific claim rested on unverified theoretical extrapolations, not established physics.",
    phi: 0.5, ke: 0.3, f: 0.4, sigma: 0.7,
    phiJustification: "Concern is documented in legal filings and public record; underlying physics speculations are traceable to real theoretical literature",
    keJustification: "Mechanism speculative — derived from unverified extensions of standard model physics involving extra dimensions not yet observed",
    fJustification: "Moderate fragmentation: serious physicists took the concern seriously enough to commission safety reviews, but scientific community did not treat it as credible",
    sigmaJustification: "Concern propagated significantly in public sphere despite limited scientific support; generated legal action and media coverage",
    competingInterpretations: [
      { prior: "Physics consensus", reading: "The concern was not scientifically credible. The theoretical mechanisms required for dangerous black hole formation were not supported by any established physics. The safety reviews were a responsible public communication exercise, not a genuine scientific uncertainty.", sigDifference: "Kₑ drops to 0.10; F drops to 0.20 — the concern was never a real epistemic competitor" },
      { prior: "Precautionary", reading: "Any non-zero probability of Earth-destroying outcomes warrants serious analysis, regardless of how low the probability. The concern deserved the formal safety review it received. The fact that the safety case is strong does not mean the concern was unreasonable to raise.", sigDifference: "Kₑ rises to 0.40; the concern had legitimate precautionary basis even if the mechanism was speculative" },
    ],
    crux: "Were there any established physics scenarios (not requiring speculative extensions) under which LHC-produced black holes could be stable and dangerous? If yes, the concern was more epistemically grounded than the consensus view suggested.",
    cruxType: "Theoretical physics",
    missingEvidence: "Direct experimental observation of microscopic black hole formation and evaporation at any energy scale — which would confirm or refute Hawking radiation and settle the stability question directly.",
    dependencies: [], correlatedWith: [], adversarialFlag: null,
  },
  {
    id: 10, case: "LHC Black Hole Safety", year: "2003", nodeType: "claim",
    who: "CERN LHC Safety Study Group (independent expert panel)",
    claim: "There is no conceivable threat from LHC collisions. Cosmic rays of energies far exceeding LHC achieve have struck the Earth, Moon, and all astronomical bodies throughout their existence without incident. Anything dangerous the LHC could produce would already have been produced by cosmic rays billions of times.",
    source: "LHC Safety Study Group. (2003). Study of potentially dangerous events during heavy-ion collisions at the LHC. CERN.",
    signal: "Coherent",
    signalNote: "The cosmic ray argument is logically sound and empirically grounded. Its strength is that it is not a theoretical claim about what the LHC will produce, but an observational claim about what the universe has already produced at higher energies without catastrophic outcomes. One key dependency remained open: cosmic ray-produced black holes might pass through Earth, while LHC-produced black holes could linger.",
    phi: 0.85, ke: 0.75, f: 0.25, sigma: 0.3,
    phiJustification: "Primary CERN safety report directly accessible; commissioned from independent expert panel",
    keJustification: "Cosmic ray argument is observationally grounded, not theoretical. Key dependency (lingering vs passing-through black holes) was noted but not yet fully addressed",
    fJustification: "High consistency; commissioned by the institution running the accelerator, but panel was independent",
    sigmaJustification: "Scientific concern began stabilizing; public anxiety remained elevated; one dependency not yet closed",
    competingInterpretations: [
      { prior: "Physics consensus", reading: "The 2003 report was sufficient to establish safety. The cosmic ray argument is decisive: if dangerous objects could form, they would already have formed and destroyed us. The lingering black hole distinction is a theoretical curiosity, not a real gap.", sigDifference: "Kₑ rises to 0.90; dependency is not a real weakness" },
      { prior: "Precautionary (Rees)", reading: "High-energy collisions in space differ in potentially relevant respects from controlled laboratory collisions. The cosmic ray analogy may not fully address all hazard pathways. The lingering black hole scenario required explicit additional argument before the case was closed.", sigDifference: "Kₑ stays at 0.65; the 2003 report was necessary but not sufficient" },
    ],
    crux: "Does the lingering vs passing-through distinction for LHC-produced versus cosmic ray-produced black holes represent a genuine gap in the safety argument, or is it a theoretical curiosity with no practical significance? The 2008 report addressed this directly.",
    cruxType: "Theoretical dependency",
    missingEvidence: "At time of 2003 report: explicit analysis of whether black holes produced at rest relative to Earth (as LHC would produce) posed different risks than cosmic ray black holes passing through at high velocity.",
    dependencies: [9], correlatedWith: [], adversarialFlag: null,
  },
  {
    id: 11, case: "LHC Black Hole Safety", year: "2008", nodeType: "claim",
    who: "Giddings & Mangano; CERN LHC Safety Assessment Group (LSAG); CERN Scientific Policy Committee",
    claim: "White dwarf stars and neutron stars — far denser than Earth and capable of trapping microscopic black holes — are observed to be stable throughout the universe. Their existence proves that microscopic black holes either do not form or do no damage. For strangelets, the extreme heat of LHC collisions makes formation far less likely than at RHIC, which has already been shown safe.",
    source: "Giddings, S. B., & Mangano, M. L. (2008). Physical Review D, 78(3), 035009.; Ellis, J., Giudice, G., Mangano, M. L., Tkachev, I., & Wiedemann, U. (2008). Journal of Physics G, 35(11), 115004.",
    signal: "Coherent",
    signalNote: "The 2008 report directly closed the dependency identified in 2003. The white dwarf and neutron star argument is observational, not theoretical — we directly observe these objects to be stable. CERN Scientific Policy Committee including Nobel laureate Gerard 't Hooft independently reviewed and fully endorsed the conclusions.",
    phi: 0.9, ke: 0.85, f: 0.15, sigma: 0.2,
    phiJustification: "Primary peer-reviewed papers directly accessible; independently reviewed by SPC including Nobel laureates; full chain of argument documented",
    keJustification: "Mechanism grounded in established astrophysical observations. Key dependency from 2003 explicitly addressed and closed. Nobel-level independent endorsement.",
    fJustification: "Very high consistency across independent reviews. No credible scientific dissent. SPC endorsement unanimous.",
    sigmaJustification: "Scientific consensus stable after 2008. Public concern largely resolved. Minor residual public anxiety does not represent epistemic instability.",
    competingInterpretations: [
      { prior: "Physics consensus", reading: "The 2008 argument is essentially airtight. The astrophysical argument from white dwarf stability is observationally grounded and cannot be overturned by theoretical speculation. The case is closed.", sigDifference: "Kₑ rises to 0.92; F drops to 0.08" },
      { prior: "Precautionary (Rees)", reading: "Exotic theoretical scenarios might exist in which LHC collisions differ from cosmic ray interactions in ways the stellar stability argument does not address. The residual uncertainty is small but not zero.", sigDifference: "Kₑ drops to 0.65; F rises to 0.30 — but even under this reading, the safety case is strong" },
    ],
    crux: "Are there any exotic theoretical scenarios — beyond standard model extensions already considered — in which the astrophysical argument from stellar stability would not apply to LHC-produced black holes? Even Rees, the most credible precautionary voice, did not argue the LHC should not run.",
    cruxType: "Theoretical completeness",
    missingEvidence: "Direct experimental confirmation that microscopic black holes evaporate via Hawking radiation. This would provide a priori proof rather than the astrophysical observational proof used here — though the latter is considered sufficient by the physics community.",
    dependencies: [9, 10], correlatedWith: [10], adversarialFlag: null,
  },
  {
    id: 12, case: "LHC Black Hole Safety", year: "2010–26", nodeType: "assessment",
    who: "CERN; global physics community; ongoing operations",
    claim: "The LHC has operated at energies up to 13.6 TeV since 2010, producing hundreds of millions of collisions without adverse outcomes. This constitutes ongoing observational confirmation of the safety assessment.",
    source: "CERN operational records (2010–2026); ongoing publications from ATLAS, CMS, ALICE, and LHCb experiments.",
    signal: "Coherent",
    signalNote: "This is the highest-M node in the knowledge base. Φ is near-maximum (operational data directly observable), Kₑ is near-maximum (mechanism established through prior argument and ongoing confirmation), F is minimal (no credible scientific dissent), and σ(M) has compressed to near-zero. The LHC case is the RFT framework's clearest demonstration that it can identify genuine consensus — not only failure.",
    phi: 0.95, ke: 0.9, f: 0.1, sigma: 0.15,
    phiJustification: "Operational data directly observable; results published across four major experiments by thousands of independent researchers worldwide",
    keJustification: "Mechanism established through both prior astrophysical argument and 15+ years of direct operational confirmation at target energies",
    fJustification: "Minimal fragmentation: no credible scientific dissent; legal challenges dismissed; public concern largely resolved",
    sigmaJustification: "σ(M) has compressed to near-zero in scientific community. Residual public anxiety exists but does not represent a competing epistemic attractor.",
    competingInterpretations: [
      { prior: "Physics consensus", reading: "The safety case is completely settled. Fifteen years of operation at target energies with no adverse outcomes is definitive observational confirmation. σ(M) = 0.", sigDifference: "σ(M) drops to 0.05; this is essentially a closed case" },
      { prior: "Philosophical precautionary", reading: "The argument is inductive: no bad outcome so far does not logically prove no bad outcome ever. However, this precautionary reading applies to all human activities and does not constitute a specific epistemic objection to LHC safety.", sigDifference: "σ(M) rises to 0.25 at most — this is not a competing scientific attractor" },
    ],
    crux: "Is there any remaining theoretical scenario not addressed by the 2008 astrophysical argument and 15 years of operational data that could represent a genuine safety concern? The answer from the physics community is no — but documenting this explicitly closes the case formally.",
    cruxType: "Theoretical completeness",
    missingEvidence: "None that would materially change the assessment. Direct observation of Hawking radiation would provide additional mechanistic confirmation but is not necessary for the safety case to be considered closed.",
    dependencies: [9, 10, 11], correlatedWith: [10, 11],
    adversarialFlag: "INSTITUTIONAL SELF-REVIEW: The safety reviews were commissioned by CERN itself, which has reputational and financial stakes in the LHC operating. The LSAG panel was independent, and the SPC review was independent, but the institutional chain begins with CERN. Under a strict adversarial reading, this introduces F elevation of approximately 0.1 — insufficient to change the overall assessment but worth noting for completeness.",
  },
];

function MBar({ label, value, color, justification }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: "Calibri,sans-serif" }}>{label}</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {justification && <span onClick={() => setShow(s => !s)} style={{ fontSize: 9, color: C.blue, cursor: "pointer", fontFamily: "Calibri,sans-serif" }}>why?</span>}
          <span style={{ fontSize: 11, color: C.dark, fontFamily: "Calibri,sans-serif", fontWeight: 600 }}>{value.toFixed(2)}</span>
        </div>
      </div>
      <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
        <div style={{ height: 5, borderRadius: 3, background: color, width: `${value * 100}%`, transition: "width 0.5s" }} />
      </div>
      {show && justification && (
        <div style={{ fontSize: 10, color: C.mid, fontFamily: "Calibri,sans-serif", marginTop: 4, padding: "4px 8px", background: C.cream, borderRadius: 4, lineHeight: 1.5 }}>{justification}</div>
      )}
    </div>
  );
}

function NodeCard({ node, allNodes }) {
  const [tab, setTab] = useState("signal");
  const sigColor = SIGNAL_COLORS[node.signal] || C.mid;
  const m = (node.phi * node.ke) / Math.max(node.f, 0.01);
  const mLow = ((node.phi - 0.1) * (node.ke - 0.1)) / Math.max(node.f + 0.1, 0.01);
  const mHigh = ((node.phi + 0.1) * (node.ke + 0.1)) / Math.max(node.f - 0.1, 0.01);
  const correlated = allNodes.filter(n => node.correlatedWith && node.correlatedWith.includes(n.id));
  const tabs = ["signal", "interpretations", "crux", "gaps"];
  if (node.adversarialFlag || correlated.length > 0) tabs.push("flags");

  return (
    <div style={{ background: C.nodeBg, border: `1px solid ${C.border}`, borderLeft: `4px solid ${sigColor}`, borderRadius: 8, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: sigColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "Georgia,serif", flexShrink: 0 }}>{node.id}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.gold, fontFamily: "Calibri,sans-serif", textTransform: "uppercase" }}>{node.case}</span>
            <span style={{ fontSize: 10, color: C.muted, fontFamily: "Calibri,sans-serif" }}>{node.year}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: sigColor + "20", color: sigColor, fontFamily: "Calibri,sans-serif" }}>{node.signal}</span>
            {node.adversarialFlag && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: C.red + "20", color: C.red, fontFamily: "Calibri,sans-serif", fontWeight: 700 }}>⚠ FLAG</span>}
            {correlated.length > 0 && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: C.orange + "20", color: C.orange, fontFamily: "Calibri,sans-serif", fontWeight: 700 }}>⚡ CORRELATED</span>}
          </div>
          <div style={{ fontSize: 12, color: C.mid, fontFamily: "Calibri,sans-serif", fontWeight: 600, marginBottom: 4 }}>{node.who}</div>
          <div style={{ fontSize: 13, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.5 }}>{node.claim}</div>
        </div>
        <div style={{ textAlign: "right", minWidth: 72, flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: C.muted, fontFamily: "Calibri,sans-serif", marginBottom: 1 }}>M score</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Georgia,serif", color: m < 0.5 ? C.red : m < 0.8 ? C.orange : C.green }}>{m.toFixed(2)}</div>
          <div style={{ fontSize: 9, color: C.muted, fontFamily: "Calibri,sans-serif" }}>[{Math.max(0, mLow).toFixed(2)}–{Math.min(3, mHigh).toFixed(2)}]</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginTop: 12, borderBottom: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ fontSize: 10, padding: "5px 10px", border: "none", background: "none", color: tab === t ? C.gold : C.muted, fontWeight: tab === t ? 700 : 400, borderBottom: tab === t ? `2px solid ${C.gold}` : "2px solid transparent", cursor: "pointer", marginBottom: -1, fontFamily: "Calibri,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {t === "signal" ? "RFT Signal" : t === "interpretations" ? "Interpretations" : t === "crux" ? "Crux" : t === "gaps" ? "Missing" : "Flags"}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        {tab === "signal" && (
          <div>
            <div style={{ fontSize: 12, color: C.mid, fontFamily: "Calibri,sans-serif", lineHeight: 1.6, background: sigColor + "10", padding: "8px 12px", borderRadius: 6, marginBottom: 12 }}>{node.signalNote}</div>
            <MBar label="Φ — Coherence" value={node.phi} color={C.green} justification={node.phiJustification} />
            <MBar label="Kₑ — Epistemic Alignment" value={node.ke} color={C.gold} justification={node.keJustification} />
            <MBar label="F — Fragmentation" value={node.f} color={C.red} justification={node.fJustification} />
            <MBar label="σ(M) — Instability" value={node.sigma} color={C.purple} justification={node.sigmaJustification} />
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Calibri,sans-serif", marginTop: 6 }}>Uncertainty interval: [{Math.max(0, mLow).toFixed(2)} – {Math.min(3, mHigh).toFixed(2)}] · Click "why?" on any metric to see scoring justification</div>
          </div>
        )}

        {tab === "interpretations" && (
          <div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "Calibri,sans-serif", marginBottom: 10 }}>Reasonable investigators with different priors may score this node differently. Both readings are preserved — disagreement is structural, not a bug.</div>
            {(node.competingInterpretations || []).map((ci, i) => (
              <div key={i} style={{ background: C.cream, borderRadius: 6, padding: "10px 12px", marginBottom: 8, borderLeft: `3px solid ${i === 0 ? C.blue : C.teal}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? C.blue : C.teal, fontFamily: "Calibri,sans-serif", marginBottom: 4 }}>Prior: {ci.prior}</div>
                <div style={{ fontSize: 12, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.5, marginBottom: 6 }}>{ci.reading}</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "Calibri,sans-serif", fontStyle: "italic" }}>Score impact: {ci.sigDifference}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "crux" && (
          <div style={{ background: C.blue + "10", borderRadius: 6, padding: "12px 14px", borderLeft: `3px solid ${C.blue}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Calibri,sans-serif", marginBottom: 6 }}>Crux — {node.cruxType}</div>
            <div style={{ fontSize: 13, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.6 }}>{node.crux}</div>
          </div>
        )}

        {tab === "gaps" && (
          <div style={{ background: C.teal + "10", borderRadius: 6, padding: "12px 14px", borderLeft: `3px solid ${C.teal}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Calibri,sans-serif", marginBottom: 6 }}>Missing Evidence</div>
            <div style={{ fontSize: 12, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.6 }}>{node.missingEvidence}</div>
            {node.dependencies && node.dependencies.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", fontFamily: "Calibri,sans-serif", marginBottom: 4 }}>Depends on nodes</div>
                <div style={{ display: "flex", gap: 6 }}>{node.dependencies.map(d => <span key={d} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: C.gold + "30", color: C.dark, fontFamily: "Calibri,sans-serif" }}>#{d}</span>)}</div>
              </div>
            )}
          </div>
        )}

        {tab === "flags" && (
          <div>
            {node.adversarialFlag && (
              <div style={{ background: C.red + "10", borderRadius: 6, padding: "12px 14px", borderLeft: `3px solid ${C.red}`, marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.red, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Calibri,sans-serif", marginBottom: 6 }}>⚠ Adversarial / Methodological Flag</div>
                <div style={{ fontSize: 12, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.6 }}>{node.adversarialFlag}</div>
              </div>
            )}
            {correlated.length > 0 && (
              <div style={{ background: C.orange + "10", borderRadius: 6, padding: "12px 14px", borderLeft: `3px solid ${C.orange}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Calibri,sans-serif", marginBottom: 6 }}>⚡ Correlated Evidence</div>
                <div style={{ fontSize: 12, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.6 }}>
                  This node shares evidence sources with: {correlated.map(n => `Node ${n.id} (${n.who})`).join(", ")}. These nodes are not independent — treat their M scores as a single evidence chain, not cumulative confirmation.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Calibri,sans-serif", fontStyle: "italic" }}>{node.source}</div>
      </div>
    </div>
  );
}

function SigmaChart({ nodes }) {
  if (nodes.length < 2) return null;
  const w = 500, h = 110, pad = { l: 36, r: 16, t: 12, b: 28 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const pts = nodes.map((n, i) => ({ x: pad.l + (i / (nodes.length - 1)) * iw, y: pad.t + (1 - n.sigma) * ih, n }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const fill = `${path} L${pts[pts.length-1].x},${pad.t+ih} L${pts[0].x},${pad.t+ih} Z`;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.muted, textTransform: "uppercase", marginBottom: 8, fontFamily: "Calibri,sans-serif" }}>σ(M) Instability Trajectory</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
        <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E44AD" stopOpacity="0.25"/><stop offset="100%" stopColor="#8E44AD" stopOpacity="0.02"/></linearGradient></defs>
        {[0,0.5,1].map(v => <line key={v} x1={pad.l} x2={pad.l+iw} y1={pad.t+(1-v)*ih} y2={pad.t+(1-v)*ih} stroke={C.border} strokeWidth={1} strokeDasharray="3,3"/>)}
        {[0,0.5,1].map(v => <text key={v} x={pad.l-4} y={pad.t+(1-v)*ih+4} textAnchor="end" fontSize={9} fill={C.muted} fontFamily="Calibri,sans-serif">{v.toFixed(1)}</text>)}
        <path d={fill} fill="url(#sg)"/>
        <path d={path} fill="none" stroke="#8E44AD" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"/>
        {pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill={SIGNAL_COLORS[p.n.signal]||C.mid} stroke={C.white} strokeWidth={1.5}/>)}
        {pts.map((p,i) => <text key={i} x={p.x} y={h-6} textAnchor="middle" fontSize={8} fill={C.muted} fontFamily="Calibri,sans-serif">{p.n.year.slice(0,7)}</text>)}
      </svg>
    </div>
  );
}

function RubricPanel() {
  const [open, setOpen] = useState(false);
  const [dim, setDim] = useState("phi");
  const dims = { phi: "Φ Coherence", ke: "Kₑ Alignment", f: "F Fragmentation", sigma: "σ(M) Instability" };
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.dark, textTransform: "uppercase", fontFamily: "Calibri,sans-serif" }}>Scoring Rubric — Reproducibility Guide</div>
        <span style={{ fontSize: 12, color: C.muted }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "Calibri,sans-serif", marginBottom: 10 }}>Use this rubric to assign scores reproducibly. Two investigators using this rubric should arrive within ±0.1 on most nodes.</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {Object.entries(dims).map(([k,v]) => (
              <button key={k} onClick={() => setDim(k)} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 12, border: `1px solid ${dim===k?C.gold:C.border}`, background: dim===k?C.gold:C.white, color: dim===k?C.white:C.mid, cursor: "pointer", fontFamily: "Calibri,sans-serif" }}>{v}</button>
            ))}
          </div>
          {RUBRIC[dim].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ minWidth: 70, fontSize: 11, fontFamily: "Calibri,sans-serif", color: C.gold, fontWeight: 700 }}>{row.range}</div>
              <div style={{ minWidth: 90, fontSize: 11, fontFamily: "Calibri,sans-serif", color: C.dark, fontWeight: 600 }}>{row.label}</div>
              <div style={{ fontSize: 11, fontFamily: "Calibri,sans-serif", color: C.mid, flex: 1 }}>{row.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [nodes, setNodes] = useState(SEED_NODES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCase, setActiveCase] = useState("All");
  const [view, setView] = useState("map");

  const cases = ["All", ...Array.from(new Set(nodes.map(n => n.case)))];
  const filtered = activeCase === "All" ? nodes : nodes.filter(n => n.case === activeCase);
  const avgM = filtered.reduce((s,n) => s + (n.phi*n.ke)/Math.max(n.f,0.01), 0) / (filtered.length||1);
  const avgSigma = filtered.reduce((s,n) => s + n.sigma, 0) / (filtered.length||1);
  const flagCount = filtered.filter(n => n.adversarialFlag || (n.correlatedWith && n.correlatedWith.length > 0)).length;
  const cruxNodes = filtered.filter(n => n.crux);

  async function analyze() {
    if (!input.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: `You are an epistemic analyst using Root Frequency Theory (RFT). Given a source, extract a knowledge node and return ONLY valid JSON with these exact fields:
{"case":"topic 2-5 words","year":"year or range","who":"author/institution","claim":"core claim 1-2 sentences","source":"citation","signal":"Kₑ breaks|F increases|σ(M) high|Nominal reversal|Coherent","signalNote":"1-2 sentence RFT analysis","phi":0-1,"ke":0-1,"f":0-1,"sigma":0-1,"phiJustification":"why","keJustification":"why","fJustification":"why","sigmaJustification":"why","competingInterpretations":[{"prior":"name","reading":"text","sigDifference":"score impact"}],"crux":"single highest-leverage unresolved question","cruxType":"evidence type needed","missingEvidence":"what is absent","dependencies":[],"correlatedWith":[],"adversarialFlag":null}
Rubric: Φ 0.0-0.2=no primary source, 0.8-1.0=raw data accessible. Kₑ 0.0-0.2=claim precedes mechanism, 0.8-1.0=verified independently. F 0.0-0.2=coherent, 0.8-1.0=structural fragmentation. σ(M) 0.0-0.2=stable, 0.8-1.0=bimodal. Always provide 2 competing interpretations.`,
          messages: [{ role: "user", content: `Analyze this source:\n\n${input}` }],
        }),
      });
      const data = await res.json();
      const text = data.content.map(b => b.text||"").join("").replace(/```json|```/g,"").trim();
      const node = JSON.parse(text);
      node.id = Date.now();
      if (!node.competingInterpretations) node.competingInterpretations = [];
      if (!node.dependencies) node.dependencies = [];
      if (!node.correlatedWith) node.correlatedWith = [];
      setNodes(prev => [...prev, node]);
      setInput(""); setView("map");
    } catch(e) {
      setError("Could not parse response. Try a clearer source description.");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Calibri,sans-serif" }}>
      <div style={{ background: C.dark, borderBottom: `3px solid ${C.gold}`, padding: "18px 24px 14px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", marginBottom: 4, fontWeight: 700 }}>Root Frequency Theory</div>
          <h1 style={{ margin: 0, fontSize: 20, fontFamily: "Georgia,serif", color: C.cream, fontWeight: 700 }}>Epistemic Mapping System <span style={{ fontSize: 12, fontWeight: 400, color: "#AAA", fontFamily: "Calibri,sans-serif" }}>v2 — Adversarially Robust</span></h1>
          <div style={{ fontSize: 11, color: "#999", marginTop: 3 }}>Calibrated scoring · Competing interpretations · Crux identification · Correlated evidence detection · Gap mapping</div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "18px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
          {[{ label: "Nodes", value: nodes.length },{ label: "Avg M", value: avgM.toFixed(2) },{ label: "Avg σ(M)", value: avgSigma.toFixed(2) },{ label: "Flags", value: flagCount, alert: flagCount > 0 }].map(s => (
            <div key={s.label} style={{ background: C.white, border: `1px solid ${s.alert ? C.red : C.border}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 9, color: s.alert ? C.red : C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Georgia,serif", color: s.alert ? C.red : C.dark }}>{s.value}</div>
            </div>
          ))}
        </div>

        <RubricPanel />

        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {cases.map(c => <button key={c} onClick={() => setActiveCase(c)} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 16, border: `1px solid ${activeCase===c?C.gold:C.border}`, background: activeCase===c?C.gold:C.white, color: activeCase===c?C.white:C.mid, cursor: "pointer", fontFamily: "Calibri,sans-serif" }}>{c}</button>)}
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: `2px solid ${C.border}` }}>
          {[["map","Knowledge Map"],["trajectory","σ(M) Trajectory"],["cruxes","Crux Nodes"]].map(([t,l]) => (
            <button key={t} onClick={() => setView(t)} style={{ fontSize: 11, padding: "7px 16px", border: "none", background: "none", color: view===t?C.gold:C.muted, fontWeight: view===t?700:400, borderBottom: view===t?`2px solid ${C.gold}`:"2px solid transparent", cursor: "pointer", marginBottom: -2, fontFamily: "Calibri,sans-serif", textTransform: "uppercase", letterSpacing: "0.07em" }}>{l}</button>
          ))}
        </div>

        {view === "trajectory" && <SigmaChart nodes={filtered} />}

        {view === "cruxes" && (
          <div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: "Calibri,sans-serif", marginBottom: 12 }}>The single highest-leverage unresolved question per node — the observation, dataset, or experiment that would most change the RFT assessment.</div>
            {cruxNodes.map(n => (
              <div key={n.id} style={{ background: C.white, border: `1px solid ${C.blue}30`, borderLeft: `4px solid ${C.blue}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Calibri,sans-serif" }}>{n.case}</span>
                  <span style={{ fontSize: 10, color: C.muted, fontFamily: "Calibri,sans-serif" }}>{n.year}</span>
                  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: C.blue+"20", color: C.blue, fontFamily: "Calibri,sans-serif", fontWeight: 700 }}>{n.cruxType}</span>
                </div>
                <div style={{ fontSize: 13, color: C.dark, fontFamily: "Calibri,sans-serif", lineHeight: 1.6 }}>{n.crux}</div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "Calibri,sans-serif", marginTop: 6, fontStyle: "italic" }}>Missing: {n.missingEvidence}</div>
              </div>
            ))}
          </div>
        )}

        {view === "map" && filtered.map(n => <NodeCard key={n.id} node={n} allNodes={nodes} />)}

        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>Add a source</div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="Paste a claim, abstract, citation, or article excerpt. The AI will extract a calibrated node with competing interpretations, a crux question, missing evidence, and adversarial flags."
            style={{ width: "100%", minHeight: 80, padding: "10px 12px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "Calibri,sans-serif", color: C.dark, background: C.cream, resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.5 }} />
          {error && <div style={{ fontSize: 12, color: C.red, marginTop: 6 }}>{error}</div>}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <button onClick={analyze} disabled={loading || !input.trim()} style={{ padding: "8px 20px", borderRadius: 6, border: "none", background: loading||!input.trim()?C.border:C.gold, color: loading||!input.trim()?C.muted:C.white, fontSize: 13, fontWeight: 700, cursor: loading||!input.trim()?"default":"pointer", fontFamily: "Calibri,sans-serif" }}>
              {loading ? "Analyzing…" : "Extract & Map Node"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: "10px 14px", background: C.white, borderRadius: 8, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.7, fontFamily: "Calibri,sans-serif" }}>
            <strong style={{ color: C.dark }}>M = (Φ · Kₑ) / F</strong> · <strong style={{ color: C.dark }}>σ(M)</strong> = instability index · Structured rubric ensures reproducibility · Brackets = uncertainty interval · ⚡ correlated evidence · ⚠ adversarial flag<br/>
            <span style={{ color: C.gold }}>Bianca Avanzo · Root Lab · avanzorft.com · ORCID 0009-0006-9226-1241</span>
          </div>
        </div>
      </div>
    </div>
  );
}
