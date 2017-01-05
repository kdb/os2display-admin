<?php

namespace Indholdskanalen\MainBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Entity\User as BaseUser;
use FOS\UserBundle\Model\GroupInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user_user")
 */
class User extends BaseUser
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  protected $id;

  /**
   * @ORM\ManyToMany(targetEntity="Indholdskanalen\MainBundle\Entity\Group")
   * @ORM\JoinTable(name="fos_user_user_group",
   *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
   *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="id")}
   * )
   */
  protected $groups;

  /**
   * Constructor
   */
  public function __construct() {
    parent::__construct();
    $this->groups = new ArrayCollection();
  }


  /**
   * Is the user administrator
   *
   * @return boolean
   */
  public function isAdmin() {
    $result = FALSE;

    foreach ($this->getRoles() as $role) {
      if ($role == 'ROLE_ADMIN' || $role === 'ROLE_SUPER_ADMIN') {
        $result = TRUE;
      }
    }

    return $result;
  }

  /**
   * Is the user a super administrator
   *
   * @return boolean
   */
  public function isSuperAdmin() {
    $result = FALSE;

    foreach ($this->getRoles() as $role) {
      if ($role == 'ROLE_SUPER_ADMIN') {
        $result = TRUE;
      }
    }

    return $result;
  }

  /**
   * Add groups
   *
   * @param GroupInterface $group
   * @return User
   */
  public function addGroup(GroupInterface $group) {
    $this->groups[] = $group;

    return $this;
  }

  /**
   * Remove group
   *
   * @param GroupInterface $group
   * @return ArrayCollection
   */
  public function removeGroup(GroupInterface $group) {
    $this->groups->removeElement($group);
  }

  /**
   * Get groups
   *
   * @return ArrayCollection
   */
  public function getGroups() {
    return $this->groups;
  }
}
